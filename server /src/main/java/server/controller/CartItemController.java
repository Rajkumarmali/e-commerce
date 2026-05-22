package server.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.CartItemException;
import server.exception.UserException;
import server.model.CartItem;
import server.model.User;
import server.response.ApiResponse;
import server.service.CartItemService;
import server.service.UserService;

@RestController
@RequestMapping("/api")
public class CartItemController {
    private CartItemService cartItemService;
    private UserService userService;

    public CartItemController(CartItemService cartItemService, UserService userService) {
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    @DeleteMapping("/cart_item/{id}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(),id);
        ApiResponse res = new ApiResponse();
        res.setMessage("Item deleted");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PutMapping("/cart_item/{id}")
    public  ResponseEntity<CartItem> updateCartItem(@PathVariable Long id,@RequestHeader("Authorization") String jwt,@RequestBody CartItem cartItem) throws UserException, CartItemException {
        User user = userService.findUserProfileByJwt(jwt);
        CartItem updateCartItem = cartItemService.updateCartItem(user.getId(),id,cartItem);
        return new ResponseEntity<>(updateCartItem,HttpStatus.OK);
    }
}
