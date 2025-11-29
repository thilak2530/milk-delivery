package com.Milk.milk_delivery.controller;

import com.Milk.milk_delivery.model.DailyDelivery;
import com.Milk.milk_delivery.repository.DailyDeliveryRepository;
import com.Milk.milk_delivery.service.DailyDeliveryService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/daily-delivery")
@CrossOrigin
public class DailyDeliveryController {

    private final DailyDeliveryService service;
    private final DailyDeliveryRepository repo;

    public DailyDeliveryController(DailyDeliveryService service,DailyDeliveryRepository repo) {
        this.service = service;
        this.repo=repo;
    }

    // Add today's delivery
    @PostMapping("/add")
    public DailyDelivery addDelivery(@RequestBody DailyDelivery dailyDelivery) {
        dailyDelivery.setDeliveryDate(LocalDate.now());
        return service.save(dailyDelivery);
    }

    // Get list of today's delivered customers
    @GetMapping("/today")
    public List<DailyDelivery> getTodayDeliveries() {
        return service.getTodayDeliveries(LocalDate.now());
    }

    // Check particular customer delivered today
    @GetMapping("/is-delivered/{customerId}")
    public boolean isDelivered(@PathVariable Long customerId) {
        return service.isDelivered(customerId, LocalDate.now());
    }

}