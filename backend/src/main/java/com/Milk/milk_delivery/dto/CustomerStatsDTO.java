package com.Milk.milk_delivery.dto;

public class CustomerStatsDTO {
    private long totalCount;
    private double totalBalance;

    public CustomerStatsDTO(long totalCount, double totalBalance) {
        this.totalCount = totalCount;
        this.totalBalance = totalBalance;
    }

    public long getTotalCount() { return totalCount; }
    public void setTotalCount(long totalCount) { this.totalCount = totalCount; }

    public double getTotalBalance() { return totalBalance; }
    public void setTotalBalance(double totalBalance) { this.totalBalance = totalBalance; }
}