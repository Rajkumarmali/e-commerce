package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}