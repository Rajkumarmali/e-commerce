# Model Package

This package contains all the JPA entity models that represent the core data structures for the e-commerce application.

## Overview

The model package defines the database schema and entity relationships for the e-commerce platform using Spring Data JPA and Hibernate. All entities are properly annotated with JPA annotations and include relationships, validations, and business logic.

## Entity Relationship Diagram

```
User (1) -----> (N) Address
User (1) -----> (N) PaymentInformation
User (1) -----> (N) Rating
User (1) -----> (N) Review

Product (1) -----> (N) Rating
Product (1) -----> (N) Review
Product (N) -----> (1) Category
Product (1) -----> (N) Size (Embedded)

Category (1) -----> (N) Product
Category (1) -----> (N) Category (Self-referencing)
```

## Entity Classes

### 1. User.java
**Core user entity** representing registered customers in the system.

**Fields:**
- `id` (Long): Primary key with auto-generation
- `firstName`, `lastName` (String): User's personal information
- `email` (String): Unique email identifier
- `password` (String): Encrypted password
- `role` (String): User role (e.g., "USER", "ADMIN")
- `mobile` (String): Contact number
- `createdAt` (LocalDateTime): Account creation timestamp

**Relationships:**
- `@OneToMany` with Address: User can have multiple shipping addresses
- `@OneToMany` with Rating: User can rate multiple products
- `@OneToMany` with Review: User can write multiple reviews
- `@ElementCollection` PaymentInformation: Embedded payment methods

**Key Features:**
- Password is stored in encrypted format
- Supports multiple addresses for shipping
- Tracks user ratings and reviews
- Role-based access control support

### 2. Product.java
**Central product entity** representing items available for purchase.

**Fields:**
- `id` (Long): Primary key
- `title` (String): Product name
- `description` (String): Detailed product description
- `price` (int): Base price in currency units
- `discountPresent` (int): Discount percentage
- `quantity` (int): Available stock
- `brand` (String): Product brand
- `color` (String): Product color
- `imageUrl` (String): Product image URL
- `numRatings` (int): Total number of ratings
- `createdAt` (LocalDateTime): Product creation timestamp

**Relationships:**
- `@ManyToOne` with Category: Product belongs to one category
- `@OneToMany` with Rating: Product can have multiple ratings
- `@OneToMany` with Review: Product can have multiple reviews
- `@ElementCollection` Size: Product available in multiple sizes

**Key Features:**
- Supports discount pricing
- Inventory management with quantity tracking
- Multi-size support for clothing/products
- Rating and review system integration

### 3. Category.java
**Hierarchical category entity** for product classification.

**Fields:**
- `id` (Long): Primary key
- `name` (String): Category name (max 50 characters, not null)
- `level` (int): Category hierarchy level

**Relationships:**
- `@ManyToOne` with Category: Self-referencing parent category
- `@OneToMany` with Product: Category contains multiple products

**Key Features:**
- Supports hierarchical category structure
- Validation on category name
- Eager fetching for parent category
- Level-based organization

### 4. Address.java
**Shipping address entity** for user delivery locations.

**Fields:**
- `id` (Long): Primary key
- `firstName`, `lastName` (String): Recipient name
- `streetAddress` (String): Street address line
- `city` (String): City name
- `state` (String): State/province
- `zipCode` (String): Postal code
- `mobile` (String): Contact number for delivery

**Relationships:**
- `@ManyToOne` with User: Address belongs to one user

**Key Features:**
- Complete address information
- Separate contact number for delivery
- Bidirectional relationship with User
- JSON ignore on user reference to prevent circular references

### 5. Rating.java
**Product rating entity** for user rating system.

**Fields:**
- `id` (Long): Primary key
- `rating` (double): Numerical rating value
- `createtAt` (LocalDateTime): Rating timestamp

**Relationships:**
- `@ManyToOne` with User: Rating given by one user
- `@ManyToOne` with Product: Rating for one product

**Key Features:**
- Double precision rating values
- Composite relationship with user and product
- Timestamp tracking
- Prevents circular JSON serialization

### 6. Review.java
**Product review entity** for detailed user feedback.

**Fields:**
- `id` (Long): Primary key
- `review` (String): Text content of the review
- `createdAt` (LocalDateTime): Review creation timestamp

**Relationships:**
- `@ManyToOne` with User: Review written by one user
- `@ManyToOne` with Product: Review for one product

**Key Features:**
- Text-based feedback system
- Separate from rating system
- User and product association
- Timestamp tracking

### 7. Size.java
**Product size entity** for size-specific inventory.

**Fields:**
- `name` (String): Size identifier (e.g., "S", "M", "L", "XL")
- `quantity` (int): Quantity available for this size

**Key Features:**
- Embedded in Product entity
- Size-specific inventory tracking
- Simple and lightweight structure
- No JPA annotations (embeddable)

### 8. PaymentInformation.java
**Payment method entity** for user payment options.

**Fields:**
- `cardHolderName` (String): Name on card
- `cardName` (String): Card type/name
- `expirationDate` (LocalDate): Card expiration date
- `cvv` (String): Card security code

**Key Features:**
- Embedded in User entity
- Secure payment information storage
- Expiration date tracking
- Multiple payment methods support

## Database Schema

The entities generate the following database tables:

- `user` - User accounts and profiles
- `product` - Product catalog
- `category` - Product categories
- `address` - User shipping addresses
- `rating` - Product ratings
- `review` - Product reviews
- `payment_information` - User payment methods
- `size` - Product sizes (embedded collection)

## JPA Annotations Used

### Core Annotations
- `@Entity` - Marks class as JPA entity
- `@Id` - Primary key field
- `@GeneratedValue` - Auto-generation strategy
- `@Column` - Column customization
- `@Table` - Table name customization

### Relationship Annotations
- `@OneToMany` - One-to-many relationship
- `@ManyToOne` - Many-to-one relationship
- `@JoinColumn` - Foreign key column specification
- `@Embedded` - Embedded object
- `@ElementCollection` - Collection of embeddable objects

### Cascade and Fetching
- `cascade = CascadeType.ALL` - Cascade all operations
- `orphanRemoval = true` - Remove orphaned entities
- `fetch = FetchType.EAGER` - Eager loading strategy

### JSON Handling
- `@JsonIgnore` - Prevent circular references in JSON serialization

## Validation

### Built-in Validations
- `@NotNull` - Field cannot be null
- `@Size(max = 50)` - String length validation

## Data Types Used

- **Long** - Primary keys and IDs
- **String** - Text fields and names
- **int** - Numeric values (price, quantity, ratings)
- **double** - Decimal ratings
- **LocalDateTime** - Timestamps with date and time
- **LocalDate** - Date-only fields
- **Collection Types** - Lists and Sets for relationships

## Best Practices Implemented

1. **Proper Relationships**: All entities have correctly defined relationships
2. **Cascade Operations**: Appropriate cascading for data consistency
3. **JSON Handling**: Prevention of circular references
4. **Validation**: Input validation where appropriate
5. **Naming Conventions**: Consistent field and table naming
6. **Timestamps**: Creation timestamps for audit trails
7. **Security**: Sensitive data handling (passwords, payment info)

## Usage Examples

### Creating a User with Address
```java
User user = new User();
user.setFirstName("John");
user.setLastName("Doe");
user.setEmail("john@example.com");

Address address = new Address();
address.setStreetAddress("123 Main St");
address.setCity("New York");
address.setUser(user);

user.getAddress().add(address);
```

### Creating a Product with Category
```java
Category category = new Category();
category.setName("Electronics");
category.setLevel(1);

Product product = new Product();
product.setTitle("Smartphone");
product.setPrice(999);
product.setCategory(category);
```

### Adding Ratings and Reviews
```java
Rating rating = new Rating();
rating.setRating(4.5);
rating.setUser(user);
rating.setProduct(product);

Review review = new Review();
review.setReview("Great product!");
review.setUser(user);
review.setProduct(product);
```

## Security Considerations

⚠️ **Important Notes:**

1. **Password Storage**: Passwords should be encrypted before storage
2. **Payment Information**: Consider using external payment providers for PCI compliance
3. **Data Validation**: Add more comprehensive validation for production use
4. **Access Control**: Implement proper authorization for sensitive operations
5. **Data Privacy**: Ensure compliance with data protection regulations

## Integration Points

This model package integrates with:
- **Repository Layer**: Spring Data JPA repositories
- **Service Layer**: Business logic and transaction management
- **Controller Layer**: REST API endpoints
- **Security Layer**: Authentication and authorization
- **Validation Layer**: Input validation and error handling
