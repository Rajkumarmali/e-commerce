package server.service;

import server.exception.OrderException;
import server.model.Address;
import server.model.Orders;
import server.model.User;

import java.util.List;

public interface OrderService {

    public Orders createOrder(User user, Address shippingAddress);
    public Orders findOrderById(Long orderId) throws OrderException;
    public List<Orders> userOrderHistory(Long userId);
    public Orders placedOrder(Long orderId) throws OrderException;
    public Orders confirmOrder(Long orderId) throws OrderException;
    public Orders shippingOrder(Long orderId) throws OrderException;
    public Orders deliveredOrder(Long orderId) throws OrderException;
    public Orders cancelOrder(Long orderId) throws OrderException;
    public List<Orders> getAllOrder();
    public void deleteOrder(Long orderId) throws OrderException;

}
