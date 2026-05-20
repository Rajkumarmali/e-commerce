package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import server.model.Orders;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

    @Query("SELECT o FROM Orders o WHERE o.user.id=:userId AND (o.orderStatus IN ('PLACED','CONFIRMED','SHIPPED','DELIVERED'))")
    public List<Orders> getUsersOrders(@Param("userId") Long userId);
}