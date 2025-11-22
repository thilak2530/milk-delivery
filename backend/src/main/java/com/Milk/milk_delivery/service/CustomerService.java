package com.Milk.milk_delivery.service;

import com.Milk.milk_delivery.dto.CustomerStatsDTO;
import com.Milk.milk_delivery.dto.DeliveryDTO;
import com.Milk.milk_delivery.model.Customers;
import com.Milk.milk_delivery.repository.CustomerRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    private final CustomerRepo repo;

    public CustomerService(CustomerRepo repo) {
        this.repo = repo;
    }

    public List<Customers> getAllCustomers(){
        return repo.findAll();
    }

    public Customers getCustomerById(long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Map<String, Object>> getAreasWithCustomerCount() {
        return repo.findAreasWithCustomerCount();
    }

    public List<Customers> getCustomerByAreaId(String areaName) {
        return repo.findByArea(areaName);
    }

    public CustomerStatsDTO getcustomerCountAndBalance() {
        List<Object[]> result = repo.getCustomersCountAndBalance();
        Object[] row = result.get(0);
        long totalCount = ((Number) row[0]).longValue();
        Double totalBalance = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;
        return new CustomerStatsDTO(totalCount, totalBalance);
    }

    public Customers addBalance(long id, BigDecimal amount) {
        Customers c = repo.findById(id).orElseThrow();
        BigDecimal newBalance = (c.getBalance() == null ? BigDecimal.ZERO : c.getBalance()).add(amount);
        c.setBalance(newBalance);
        return repo.save(c);
    }

    public Customers clearingBalance(long id, BigDecimal amount) {
        Customers c = repo.findById(id).orElseThrow();
        c.setBalance(BigDecimal.ZERO);
        return repo.save(c);
    }

    public List<DeliveryDTO> deliveredNot() {
        return repo.findAllDeliveries();
    }
}