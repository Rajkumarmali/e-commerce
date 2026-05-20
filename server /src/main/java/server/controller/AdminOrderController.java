package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.OrderException;
import server.model.Orders;
import server.response.ApiResponse;
import server.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order")
public class AdminOrderController {

    private OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Orders>> getAllOrder(){
        List<Orders> orders = orderService.getAllOrder();
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/confirmed/{orderId}")
    public ResponseEntity<Orders> confirmOrder(@PathVariable Long orderId) throws OrderException {
         Orders orders = orderService.confirmOrder(orderId);
         return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @PutMapping("/ship/{orderId}")
    public ResponseEntity<Orders> shipOrder(@PathVariable Long orderId) throws OrderException {
        Orders orders = orderService.shippingOrder(orderId);
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<Orders> deliverOrder(@PathVariable Long orderId) throws OrderException {
        Orders orders = orderService.deliveredOrder(orderId);
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<Orders> cancelOrder(@PathVariable Long orderId) throws OrderException {
        Orders orders = orderService.cancelOrder(orderId);
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable Long orderId) throws OrderException {
        orderService.deleteOrder(orderId);
        ApiResponse res  = new ApiResponse();
        res.setMessage("Order delete successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

}
