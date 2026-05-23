package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.Rating;
import server.model.Review;
import server.model.User;
import server.request.RatingRequest;
import server.request.ReviewRequest;
import server.service.ReviewService;
import server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private ReviewService reviewService;
    private UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<Review> createRating(@RequestBody ReviewRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        Review createReview =reviewService.createReview(req,user);
        return  new ResponseEntity<>(createReview, HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Review>> getProductRating(@PathVariable Long productId){
        List<Review> review = reviewService.getAllProductReview(productId);
        return new ResponseEntity<>(review,HttpStatus.ACCEPTED);
    }
}
