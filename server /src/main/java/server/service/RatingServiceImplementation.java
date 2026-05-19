package server.service;

import org.springframework.stereotype.Service;
import server.exception.ProductException;
import server.model.Product;
import server.model.Rating;
import server.model.User;
import server.repository.RatingRepository;
import server.request.RatingRequest;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImplementation implements RatingService{

    private RatingRepository ratingRepository;
    private ProductService productService;

    public RatingServiceImplementation(RatingRepository ratingRepository,
                                       ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }


    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatetAt(LocalDateTime.now());
        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {
        return ratingRepository.getAllProductsRating(productId);
    }
}
