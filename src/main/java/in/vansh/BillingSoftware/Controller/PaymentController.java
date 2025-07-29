package in.vansh.BillingSoftware.Controller;

import com.razorpay.RazorpayException;
import in.vansh.BillingSoftware.IO.OrderResponse;
import in.vansh.BillingSoftware.IO.PaymentRequest;
import in.vansh.BillingSoftware.IO.PaymentVerificationRequest;
import in.vansh.BillingSoftware.IO.RazorpayOrderResponse;
import in.vansh.BillingSoftware.Service.OrderService;
import in.vansh.BillingSoftware.Service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)

    public RazorpayOrderResponse crateRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}