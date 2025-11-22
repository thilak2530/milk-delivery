package com.Milk.milk_delivery.dto;

public class DeliveryDTO {
    private String name;
    private boolean delivered;

    public DeliveryDTO(String name, boolean delivered) {
        this.name = name;
        this.delivered = delivered;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isDelivered() { return delivered; }
    public void setDelivered(boolean delivered) { this.delivered = delivered; }
}