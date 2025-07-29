package in.vansh.BillingSoftware.Service;

import in.vansh.BillingSoftware.IO.OrderRequest;
import in.vansh.BillingSoftware.IO.OrderResponse;
import in.vansh.BillingSoftware.IO.PaymentVerificationRequest;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();
    OrderResponse verifyPayment(PaymentVerificationRequest request);
    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);
    List<OrderResponse> findRecentOrders();
}