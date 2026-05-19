package server.service;

import server.exception.CartItemException;
import server.exception.UserException;
import server.model.Cart;
import server.model.CartItem;
import server.model.Product;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws CartItemException, UserException;
    public CartItem isCartItemExist(Cart cart, Product product,String size,Long userId);
    public void removeCartItem(Long userId,Long cartItemId) throws CartItemException,UserException;
    public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
