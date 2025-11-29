package com.Milk.milk_delivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MilkDeliveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MilkDeliveryApplication.class, args);
	}

}
