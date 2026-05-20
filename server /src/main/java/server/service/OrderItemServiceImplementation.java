package server.service;

import org.springframework.stereotype.Service;
import server.model.OrderItem;
import server.repository.OrderItemRepository;

@Service
public class OrderItemServiceImplementation implements OrderItemService{

   private OrderItemRepository orderItemRepository;

    public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
