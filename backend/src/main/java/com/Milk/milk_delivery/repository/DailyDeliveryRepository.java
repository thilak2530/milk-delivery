package com.Milk.milk_delivery.repository;

import com.Milk.milk_delivery.model.DailyDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


public interface DailyDeliveryRepository extends JpaRepository<DailyDelivery, Integer> {

    List<DailyDelivery> findByDeliveryDate(LocalDate deliveryDate);

    List<DailyDelivery> findByCustomerIdAndDeliveryDate(Long customerId, LocalDate deliveryDate);
}