package server.service;

import org.springframework.stereotype.Service;
import server.exception.ProductException;
import server.model.Product;
import server.model.Review;
import server.model.User;
import server.repository.ReviewRepository;
import server.request.ReviewRequest;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService{

    private ReviewRepository reviewRepository;
    private ProductService productService;

    public ReviewServiceImplementation(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());
        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllProductReview(Long productId) {
        return reviewRepository.getAllProductReview(productId);
    }
}
