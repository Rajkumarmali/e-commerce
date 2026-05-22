package server.controller;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.exception.OrderException;
import server.model.Orders;
import server.repository.OrdersRepository;
import server.response.ApiResponse;
import server.response.PaymentLineResponse;
import server.service.OrderService;
import server.service.UserService;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    private OrderService orderService;
    private UserService userService;
    private OrdersRepository ordersRepository;

    public PaymentController(OrderService orderService, UserService userService, OrdersRepository ordersRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.ordersRepository = ordersRepository;
    }

    @PostMapping("/payment/{orderId}")
    public ResponseEntity<PaymentLineResponse> createPaymentLink(@PathVariable Long orderId,
                                                                 @RequestHeader("Authorization") String jwt) throws OrderException, RazorpayException {
        Orders orders = orderService.findOrderById(orderId);
        try{
            RazorpayClient razorpayClient = new RazorpayClient(apiKey,apiSecret);
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount",orders.getTotalDiscountedPrice()*100);
            paymentLinkRequest.put("currency","INR");

            JSONObject customer = new JSONObject();
            customer.put("name",orders.getUser().getFirstName());
            customer.put("email",orders.getUser().getEmail());
            paymentLinkRequest.put("customer",customer);

            JSONObject notify = new JSONObject();
            notify.put("sms",true);
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            paymentLinkRequest.put("callback_url","http://localhost:3000/payment/"+orderId);
            paymentLinkRequest.put("callback_method","get");

            PaymentLink payment =
                    razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId=payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentLineResponse res = new PaymentLineResponse();
            res.setPayment_link_id(paymentLinkId);
            res.setPayment_link_url(paymentLinkUrl);

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

        } catch (Exception err){
            throw new RazorpayException(err.getMessage());
        }
    }

    @GetMapping("/payment")
    public ResponseEntity<ApiResponse> redirect(@RequestParam(name = "payment_id") String paymentId,
                                                @RequestParam(name = "order_id") Long orderId) throws OrderException, RazorpayException {
        Orders orders = orderService.findOrderById(orderId);
        RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
        try{
              Payment payment = razorpay.payments.fetch(paymentId);
              if(payment.get("status").equals("captured")){
                  orders.getPaymentDetails().setPaymentId(paymentId);
                  orders.getPaymentDetails().setStatus("COMPLETED");
                  orders.setOrderStatus("PLACED");
                  ordersRepository.save(orders);
              }
              ApiResponse res = new ApiResponse();
              res.setMessage("Your order get placed");
              res.setStatus(true);

              return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
        } catch (Exception err){
            throw new RazorpayException(err.getMessage());
        }

    }
}
