package server.service;

import org.springframework.stereotype.Service;
import server.exception.OrderException;
import server.model.*;
import server.repository.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService{

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;
    private OrdersRepository ordersRepository;
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    private OrderItemRepository orderItemRepository;
    private OrderItemService orderItemService;
    private CartService cartService;

    public OrderServiceImplementation(CartRepository cartRepository, CartItemService cartItemService, ProductService productService, OrdersRepository ordersRepository, AddressRepository addressRepository, UserRepository userRepository, OrderItemRepository orderItemRepository, OrderItemService orderItemService, CartService cartService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.ordersRepository = ordersRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderItemService = orderItemService;
        this.cartService = cartService;
    }

    @Override
    public Orders createOrder(User user, Address shippingAddress) {
        shippingAddress.setUser(user);
        Address address = addressRepository.save(shippingAddress);
        user.getAddress().add(address);
        userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem item:cart.getCartItems()){
            OrderItem orderItem=new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscoutedPrice(item.getDiscountedPrice());

            OrderItem createdOrderItem = orderItemRepository.save(orderItem);

            orderItems.add(createdOrderItem);
        }

        Orders createdOrder = new Orders();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountPrice());
//        createdOrder.setDiscount();
       createdOrder.setTotalItems(cart.getTotalItem());

       createdOrder.setShippingAddress(address);
       createdOrder.setOrderDate(LocalDateTime.now());
       createdOrder.setOrderStatus("PENDING");
       createdOrder.getPaymentDetails().setStatus("PENDING");
       createdOrder.setCreatedAt(LocalDateTime.now());

       Orders saveOrder = ordersRepository.save(createdOrder);

       for(OrderItem item:orderItems){
           item.setOrder(saveOrder);
           orderItemRepository.save(item);
       }
        return saveOrder;
    }

    @Override
    public Orders findOrderById(Long orderId) throws OrderException {
        Optional<Orders> opt = ordersRepository.findById(orderId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new OrderException("order not fount with this id : "+orderId);
    }

    @Override
    public List<Orders> userOrderHistory(Long userId) {
        List<Orders> orders = ordersRepository.getUsersOrders(userId);
        return orders;
    }

    @Override
    public Orders placedOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("PLACED");
        orders.getPaymentDetails().setStatus("COMPLETED");
        return orders;
    }

    @Override
    public Orders confirmOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("CONFIRMED");
        return ordersRepository.save(orders);
    }

    @Override
    public Orders shippingOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("SHIPPED");
        return ordersRepository.save(orders);
    }

    @Override
    public Orders deliveredOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("DELIVERED");
        return ordersRepository.save(orders);
    }

    @Override
    public Orders cancelOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("CANCELLED");
        return ordersRepository.save(orders);
    }

    @Override
    public List<Orders> getAllOrder() {
        return ordersRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
         Orders orders = findOrderById(orderId);
         ordersRepository.deleteById(orderId);
    }
}
