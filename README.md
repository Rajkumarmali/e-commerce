# Product Service — E-Commerce Backend

This document describes the **Product** domain layer: service interface, implementation, repositories, models, and tests for the Spring Boot server.

## Overview

The product module manages catalog items with a **three-level category hierarchy** (e.g. Electronics → Mobile → Smartphone). It supports creating products, updating quantity, deleting products, finding by ID, and paginated listing with filters (category, price, discount, color, stock, sort).

| Layer                          | Responsibility                               |
| ------------------------------ | -------------------------------------------- |
| `ProductService`               | Contract for product operations              |
| `ProductServiceImplementation` | Business logic, category creation, filtering |
| `ProductRepository`            | JPA persistence and custom filter query      |
| `CategoryRepository`           | Category lookup and parent-child queries     |
| `CreateProductRequest`         | DTO for product creation                     |
| `ProductionException`          | Thrown when a product is not found           |

**Status:** Service layer and tests are implemented. REST controllers for `/products` are not yet wired; expose these methods via a `ProductController` when ready.

## Tech Stack

- Java / Spring Boot
- Spring Data JPA
- MySQL (`ecommerce` database)
- Server port: **5454** (see `application.properties`)

## Project Structure

```
server /src/main/java/server/
├── model/
│   ├── Product.java
│   ├── Category.java
│   └── Size.java
├── request/
│   └── CreateProductRequest.java
├── repository/
│   ├── ProductRepository.java
│   └── CategoryRepository.java
├── service/
│   ├── ProductService.java
│   └── ProductServiceImplementation.java
└── exception/
    └── ProductionException.java

server /src/test/java/server/server/
└── TestProduct.java
```

## Service API

### `ProductService` methods

| Method                                       | Description                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `createProduct(CreateProductRequest req)`    | Creates top/second/third level categories if missing, then saves product |
| `findProductById(Long productId)`            | Returns product or throws `ProductionException`                          |
| `updateProduct(Long productId, Product req)` | Updates quantity when `req.getQuantity() != 0`                           |
| `deleterProduct(Long productId)`             | Clears sizes, deletes product                                            |
| `findProductByCategory(String category)`     | **Stub** — currently returns empty list                                  |
| `getAllProduct(...)`                         | Filtered, paginated product list                                         |

### Create product — request shape

Used by `createProduct`. Categories are created automatically if they do not exist.

```json
{
  "title": "iPhone 15",
  "description": "Apple Mobile",
  "price": 100000,
  "discountPresent": 10,
  "quantity": 5,
  "brand": "Apple",
  "color": "Black",
  "imageUrl": "iphone.png",
  "sizes": [],
  "topLevelCategory": "Electronics",
  "secondLevelCategory": "Mobile",
  "thirdLevelCategory": "SmartPhone"
}
```

| Field               | Type        | Description                           |
| ------------------- | ----------- | ------------------------------------- |
| title               | String      | Product name                          |
| description         | String      | Product description                   |
| price               | int         | List price                            |
| discountPresent     | int         | Discount percentage                   |
| quantity            | int         | Stock quantity                        |
| brand               | String      | Brand name                            |
| color               | String      | Color variant                         |
| imageUrl            | String      | Image URL                             |
| sizes               | Set\<Size\> | Available sizes                       |
| topLevelCategory    | String      | Level-1 category (created if missing) |
| secondLevelCategory | String      | Level-2 category                      |
| thirdLevelCategory  | String      | Level-3 category (linked to product)  |

### Filter and pagination — `getAllProduct`

| Parameter           | Type           | Description                                      |
| ------------------- | -------------- | ------------------------------------------------ |
| category            | String         | Filter by category name (`null` = all)           |
| color               | List\<String\> | Filter by color (case-insensitive)               |
| size                | List\<String\> | Reserved for size filter                         |
| minPrice / maxPrice | Integer        | Filter on `discountedPrice`                      |
| minDiscount         | Integer        | Minimum discount %                               |
| sort                | String         | `price_low` or `price_high`                      |
| stock               | String         | `in_stock` (qty > 0) or `out_of_stock` (qty < 1) |
| pageNumber          | Integer        | Zero-based page index                            |
| pageSize            | Integer        | Page size                                        |

Returns `Page<Product>` with filtered content and total count.

### Errors

**`ProductionException`** — thrown when a product is not found, for example:

```
Product not fount with this id -{productId}
```

Handle in a controller with `@ExceptionHandler` or a global handler and return HTTP 404.

## Category hierarchy

On create:

1. **Level 1** — `topLevelCategory` (no parent)
2. **Level 2** — `secondLevelCategory` (parent: level 1)
3. **Level 3** — `thirdLevelCategory` (parent: level 2)

The product is associated with the **third-level** category.

## Database

- **URL:** `jdbc:mysql://localhost:3306/ecommerce`
- **DDL:** `spring.jpa.hibernate.ddl-auto=update`

Ensure MySQL is running and the `ecommerce` database exists before tests or startup.

## Running tests

From the `server ` module directory:

```bash
./mvnw test -Dtest=TestProduct
```

`TestProduct` covers:

- `testCreateProduct` — create with categories and assertions
- `testUpdateProduct` — quantity update
- `findProductById` — fetch by ID
- `findAllProduct` — filtered pagination (e.g. color `Black`)

## Dependencies

`ProductServiceImplementation` is constructed with:

- `ProductRepository`
- `UserService` (injected; reserved for future seller/admin checks)
- `CategoryRepository`

## Integration with Auth

The main [README](../README.md) documents JWT auth at `/auth`. When you add `ProductController`, protect admin routes (create/update/delete) with Spring Security and JWT, consistent with the auth documentation.

## Known limitations / follow-ups

1. **No REST controller yet** — wire `ProductService` to HTTP endpoints.
2. **`findProductByCategory`** — returns empty list; implement repository query.
3. **`updateProduct`** — only updates quantity today.
4. **Naming** — consider renaming `ProductionException` → `ProductException` and `deleterProduct` → `deleteProduct` in a later change.
5. **Secrets** — do not commit real DB passwords; use environment variables in `application.properties`.

## Future REST endpoints (suggested)

| Method | Path                 | Service method                             |
| ------ | -------------------- | ------------------------------------------ |
| POST   | `/api/products`      | `createProduct`                            |
| GET    | `/api/products/{id}` | `findProductById`                          |
| PUT    | `/api/products/{id}` | `updateProduct`                            |
| DELETE | `/api/products/{id}` | `deleterProduct`                           |
| GET    | `/api/products`      | `getAllProduct` (query params for filters) |

---

**Last Updated:** May 2026  
**Version:** 1.0 (service layer)
