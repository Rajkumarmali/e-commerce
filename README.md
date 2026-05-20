Add Rating and Review service layer

## Summary

- Introduces **RatingService** and **ReviewService** interfaces with Spring `@Service` implementations for product ratings and text reviews.
- Adds **RatingRepository** and **ReviewRepository** with JPQL queries to fetch all ratings/reviews for a product.
- Supports creating ratings and reviews from request DTOs, linking them to **User** and **Product**, and listing feedback by `productId`.
- Includes integration tests (**TestRating**, **TestReview**) plus **Rating** / **Review** entities and request models.

> REST controllers are not included; this PR is the backend service and persistence layer only.

## Changes

### Services

| Component                     | Responsibility                                                         |
| ----------------------------- | ---------------------------------------------------------------------- |
| `RatingService`               | `createRating`, `getProductsRating`                                    |
| `RatingServiceImplementation` | Validates product via `ProductService`, persists rating with timestamp |
| `ReviewService`               | `createReview`, `getAllProductReview`                                  |
| `ReviewServiceImplementation` | Validates product via `ProductService`, persists review with timestamp |

### Supporting code

- **Repositories:** `RatingRepository`, `ReviewRepository`
- **Request DTOs:** `RatingRequest` (productId, rating), `ReviewRequest` (productId, review)
- **Models:** `Rating`, `Review` (JPA entities with user/product associations)
- **Tests:** `TestRating`, `TestReview`

### Service API

**RatingService**

- `createRating(RatingRequest req, User user)` — loads product by id, creates a `Rating` with score and `createtAt`, saves to DB
- `getProductsRating(Long productId)` — returns all ratings for the given product

**ReviewService**

- `createReview(ReviewRequest req, User user)` — loads product by id, creates a `Review` with text and `createdAt`, saves to DB
- `getAllProductReview(Long productId)` — returns all reviews for the given product

## Files included

```
server/src/main/java/server/service/RatingService.java
server/src/main/java/server/service/RatingServiceImplementation.java
server/src/main/java/server/service/ReviewService.java
server/src/main/java/server/service/ReviewServiceImplementation.java
server/src/main/java/server/repository/RatingRepository.java
server/src/main/java/server/repository/ReviewRepository.java
server/src/main/java/server/request/RatingRequest.java
server/src/main/java/server/request/ReviewRequest.java
server/src/main/java/server/model/Rating.java
server/src/main/java/server/model/Review.java
server/src/test/java/server/server/TestRating.java
server/src/test/java/server/server/TestReview.java
```
