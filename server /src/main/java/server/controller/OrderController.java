package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.OrderException;
import server.exception.UserException;
import server.model.Address;
import server.model.Orders;
import server.model.User;
import server.service.OrderService;
import server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private OrderService orderService;
    private UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<Orders> createOrder(@RequestHeader("Authorization") String jwt,
                                              @RequestBody Address shippingAddress) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Orders orders = orderService.createOrder(user,shippingAddress);
        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Orders>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Orders> orders = orderService.userOrderHistory(user.getId());
         return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> findOrderById(@RequestHeader("Authorization") String jwt,@PathVariable Long id) throws UserException, OrderException {
        User user = userService.findUserProfileByJwt(jwt);
        Orders orders = orderService.findOrderById(id);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

}
