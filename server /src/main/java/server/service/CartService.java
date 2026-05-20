package server.service;

import server.exception.ProductException;
import server.model.Cart;
import server.model.User;
import server.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException;
    public Cart findUserCart(Long userId);

}
