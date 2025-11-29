package com.Milk.milk_delivery.service;

import com.Milk.milk_delivery.model.DailyDelivery;
import com.Milk.milk_delivery.repository.DailyDeliveryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyDeliveryService {

    private final DailyDeliveryRepository repo;

    public DailyDeliveryService(DailyDeliveryRepository repo) {
        this.repo = repo;
    }

    public DailyDelivery save(DailyDelivery dailyDelivery) {
        return repo.save(dailyDelivery);
    }

    public List<DailyDelivery> getTodayDeliveries(LocalDate today) {
        return repo.findByDeliveryDate(today);
    }

    public boolean isDelivered(Long customerId, LocalDate date) {
        return repo.findByCustomerIdAndDeliveryDate(customerId, date).size() > 0;
    }
}