package server.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.User;
import server.request.ReviewRequest;
import server.service.ReviewService;
import server.service.UserService;

@SpringBootTest
public class TestReview {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @Test
    public void testCreateReview() throws UserException, ProductException {
        ReviewRequest req = new ReviewRequest();
        req.setReview("Nice");
        req.setProductId(1L);

        User user = userService.FindUserById(2L);

        reviewService.createReview(req,user);

    }

    @Test
    public void testGetReview(){
        reviewService.getAllProductReview(1L);
    }
}
