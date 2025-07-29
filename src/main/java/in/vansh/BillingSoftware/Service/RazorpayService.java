package in.vansh.BillingSoftware.Service;

import com.razorpay.RazorpayException;
import in.vansh.BillingSoftware.IO.RazorpayOrderResponse;

public interface RazorpayService {
    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}