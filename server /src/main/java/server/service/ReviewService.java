package server.service;

import server.exception.ProductException;
import server.model.Review;
import server.model.User;
import server.request.ReviewRequest;

import java.util.List;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws ProductException;
    public List<Review> getAllProductReview(Long productId);

}
