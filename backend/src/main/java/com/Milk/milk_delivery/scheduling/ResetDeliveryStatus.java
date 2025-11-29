package com.Milk.milk_delivery.scheduler;

import com.Milk.milk_delivery.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;



@Component
public class ResetDeliveryStatus {

    @Autowired
    private CustomerRepo repo;

    // Runs every day at 12 AM (midnight)
    @Scheduled(cron = "0 0 0 * * *")
    public void resetDeliveredStatus() {
        repo.resetDeliveryStatus();
        System.out.println("✔ Delivery status reset to FALSE at 12 AM");
    }
}