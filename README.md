# Add Cart and CartItem service layer

## Summary

- Introduces **CartService** and **CartItemService** interfaces with Spring `@Service` implementations for cart lifecycle and line-item management.
- Adds **CartRepository** and **CartItemRepository** with custom JPQL queries to look up carts by user and detect duplicate items (same product, size, and user).
- Supports creating a user cart, adding items via **AddItemRequest**, computing cart totals, and CRUD-style operations on cart items with ownership checks.
- Includes integration tests (**TestCartService**, **TestCartItemService**) and supporting model/exception updates.

## Changes

### Services (core)

| Component                       | Responsibility                                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `CartService`                   | `createCart`, `addCartItem`, `findUserCart`                                                                                |
| `CartServiceImplementation`     | Orchestrates cart repo, cart item service, and product service; aggregates `totalPrice`, `totalItem`, `totalDiscountPrice` |
| `CartItemService`               | `createCartItem`, `updateCartItem`, `isCartItemExist`, `removeCartItem`, `findCartItemById`                                |
| `CartItemServiceImplementation` | Persists items, validates user ownership on update/remove                                                                  |

### Supporting code

- **Repositories:** `CartRepository`, `CartItemRepository`
- **Request DTO:** `AddItemRequest` (productId, size, quantity, price)
- **Models:** `Cart`, `CartItem` (JPA entities and relationships)
- **Exception:** `CartItemException`
- **Tests:** `TestCartService`, `TestCartItemService`
- **Related updates:** `ProductService` / `ProductServiceImplementation`, `ProductException`, `application.properties`

### API surface (service layer)

**CartService**

- `createCart(User user)` — creates and saves a cart for a user
- `addCartItem(Long userId, AddItemRequest req)` — adds a new line item if the same product/size is not already in the cart; uses product price and discounted price
- `findUserCart(Long userId)` — loads the user cart, sums item prices/quantities, persists totals on the cart

**CartItemService**

- `createCartItem(CartItem cartItem)` — saves a new cart line item
- `updateCartItem(Long userId, Long id, CartItem cartItem)` — updates quantity and prices when the caller owns the item
- `isCartItemExist(Cart, Product, size, userId)` — duplicate detection for add-to-cart
- `removeCartItem(Long userId, Long cartItemId)` — deletes item if owned by the user
- `findCartItemById(Long cartItemId)` — lookup or `CartItemException`
