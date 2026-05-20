package server.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.config.JwtConstant;
import server.exception.ProductException;
import server.exception.UserException;
import server.model.Cart;
import server.model.User;
import server.request.AddItemRequest;
import server.service.CartService;
import server.service.UserService;

@RestController
@RequestMapping("/api")
public class CartController {

    private CartService cartService;
    private UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> userCart(HttpServletRequest request) throws UserException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());
        return new ResponseEntity<>(cart,HttpStatus.ACCEPTED);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<String> addCartItem(@RequestBody AddItemRequest req, HttpServletRequest request) throws UserException, ProductException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        User user = userService.findUserProfileByJwt(jwt);
        String message = cartService.addCartItem(user.getId(),req);
        return new ResponseEntity<>(message,HttpStatus.CREATED);
    }
}
