package server.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.User;
import server.request.RatingRequest;
import server.service.RatingService;
import server.service.UserService;

@SpringBootTest
public class TestRating {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserService userService;

    @Test
    public void testCreateRating() throws UserException, ProductException {
        RatingRequest req= new RatingRequest();
        req.setProductId(1L);
        req.setRating(3.7);

        User user = userService.FindUserById(2L);

       ratingService.createRating(req,user);
    }

    @Test
    public void testGetRating(){
        ratingService.getProductsRating(1L);
    }

}
