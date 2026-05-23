package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.Rating;
import server.model.User;
import server.request.RatingRequest;
import server.service.RatingService;
import server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    private RatingService ratingService;
    private UserService userService;

    public RatingController(RatingService ratingService, UserService userService) {
        this.ratingService = ratingService;
        this.userService = userService;

    }

    @PostMapping("/")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        Rating createRating = ratingService.createRating(req,user);
        return  new ResponseEntity<>(createRating, HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Rating>> getProductRating(@PathVariable Long productId){
        List<Rating> rating = ratingService.getProductsRating(productId);
        return new ResponseEntity<>(rating,HttpStatus.ACCEPTED);
    }
}
