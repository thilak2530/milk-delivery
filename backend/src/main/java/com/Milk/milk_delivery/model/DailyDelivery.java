package com.Milk.milk_delivery.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_deliveries")
@Data
public class DailyDelivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Customer ID from customers table
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "delivery_date", nullable = false)
    private LocalDate deliveryDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    private String quantity;
    private int price;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}