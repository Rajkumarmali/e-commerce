package server.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import server.exception.ProductException;
import server.model.Cart;
import server.model.CartItem;
import server.model.Product;
import server.model.User;
import server.repository.CartRepository;
import server.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService{

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImplementation(CartRepository cartRepository,
                                     CartItemService cartItemService,
                                     ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {
         Cart cart = new Cart();
         cart.setUser(user);
         return cartRepository.save(cart);
    }

//    @Transactional
    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart,product,req.getSize(),userId);
        if(isPresent==null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(userId);

            int price = req.getQuantity()*product.getPrice();
            cartItem.setPrice(price);

            cartItem.setSize(req.getSize());

            int discountedPrice = product.getDiscountedPrice() * req.getQuantity();
            cartItem.setDiscountedPrice(discountedPrice);

            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        }
       return "Item add to cart";
    }

    @Transactional
    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for(CartItem cartItem :cart.getCartItems()){
          totalPrice = totalPrice+cartItem.getPrice();
          totalDiscountedPrice =totalDiscountedPrice +cartItem.getDiscountedPrice();
          totalItem = totalItem+cartItem.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalDiscountPrice(totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
