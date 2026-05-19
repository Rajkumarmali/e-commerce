package server.service;

import org.springframework.stereotype.Service;
import server.exception.CartItemException;
import server.exception.UserException;
import server.model.Cart;
import server.model.CartItem;
import server.model.Product;
import server.model.User;
import server.repository.CartItemRepository;
import server.repository.CartRepository;

import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImplementation(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getDiscountedPrice()*cartItem.getQuantity());

        CartItem createdCartItem = cartItemRepository.save(cartItem);
        return createdCartItem;
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item = findCartItemById(id);
        User user = userService.FindUserById(item.getUserId());

        if(user.getId().equals(userId)){
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getQuantity()*item.getProduct().getPrice());
            item.setDiscountedPrice(item.getDiscountedPrice()*item.getQuantity());
        }
        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart,product,size,userId);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user  = userService.FindUserById(cartItem.getUserId());
        User reqUser = userService.FindUserById(userId);
        if(user.getId().equals(reqUser.getId())){
          cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("you can't remove another users items");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);
        if(opt.isPresent()){
            return opt.get();
        }
       throw new CartItemException("cart item not found with id : " +cartItemId);
    }
}
