package com.Milk.milk_delivery.repository;

import com.Milk.milk_delivery.dto.DeliveryDTO;
import com.Milk.milk_delivery.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface CustomerRepo extends JpaRepository<Customers, Long> {

    @Query("SELECT c.street_name AS area, COUNT(c) AS customerCount FROM Customers c GROUP BY c.street_name")
    List<Map<String, Object>> findAreasWithCustomerCount();

    @Query("SELECT c FROM Customers c WHERE LOWER(TRIM(c.street_name)) = LOWER(TRIM(:areaNa))")
    List<Customers> findByArea(@Param("areaNa") String area);

    @Query("SELECT COUNT(c), SUM(c.balance) FROM Customers c")
    List<Object[]> getCustomersCountAndBalance();

    @Query("SELECT new com.Milk.milk_delivery.dto.DeliveryDTO(c.name, c.deliveredNot) FROM Customers c")
    List<DeliveryDTO> findAllDeliveries();
}