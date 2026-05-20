package server.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.exception.CartItemException;
import server.exception.UserException;
import server.model.CartItem;
import server.model.Product;
import server.model.User;
import server.repository.ProductRepository;
import server.service.CartItemService;
import server.service.UserService;

@SpringBootTest
public class TestCartItemService {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testCreateItem() throws UserException {
        Product product = productRepository.findById(1L).orElseThrow();
        // Create CartItem
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setUserId(1L);
        cartItem.setDiscountedPrice(800);

        CartItem cartItem1 = cartItemService.createCartItem(cartItem);
        System.out.println(cartItem1);

    }

    @Test
    public void testUpdateCartItem() throws CartItemException, UserException {
        Product product =
                productRepository.findById(1L).orElseThrow();

        CartItem cartItem = new CartItem();
        cartItem.setQuantity(4);
        cartItemService.updateCartItem(1L,3L,cartItem);
    }

    @Test
    public void findCartItemById() throws CartItemException {
        CartItem cartItem = cartItemService.findCartItemById(3L);
        System.out.println(cartItem);
    }

    @Test
    public void testRemoveCartItem() throws CartItemException, UserException {
        cartItemService.removeCartItem(1L,3L);
    }

}
