package in.vansh.BillingSoftware.Repository;

import in.vansh.BillingSoftware.Entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
}