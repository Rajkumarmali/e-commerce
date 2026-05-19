package server.service;

import server.exception.ProductException;
import server.model.Rating;
import server.model.User;
import server.request.RatingRequest;

import java.util.List;

public interface RatingService {

    public Rating createRating(RatingRequest req, User user) throws ProductException;
    public List<Rating> getProductsRating(Long productId);

}
