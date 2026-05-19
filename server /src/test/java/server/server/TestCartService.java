package server.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.User;
import server.request.AddItemRequest;
import server.service.CartService;
import server.service.UserService;

@SpringBootTest
public class TestCartService {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Test
    public void testCreateCart() throws UserException {
        User user = userService.FindUserById(1L);
        cartService.createCart(user);
    }

    @Test
    public void testAddCartItem() throws ProductException {
        AddItemRequest req = new AddItemRequest();

        req.setProductId(2L); // existing product id
        req.setQuantity(2);
        req.setSize("M");

        cartService.addCartItem(1L,req);

    }

    @Test
    public void testFindCartByUser(){
        cartService.findUserCart(1L);
    }
}
