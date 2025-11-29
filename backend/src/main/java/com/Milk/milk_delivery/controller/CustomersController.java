package com.Milk.milk_delivery.controller;

import com.Milk.milk_delivery.dto.CustomerStatsDTO;
import com.Milk.milk_delivery.dto.DeliveryDTO;
import com.Milk.milk_delivery.model.Customers;
import com.Milk.milk_delivery.repository.CustomerRepo;
import com.Milk.milk_delivery.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController

public class CustomersController {

    private final CustomerService service;
    private final CustomerRepo repo;

    public CustomersController(CustomerService service, CustomerRepo repo) {
        this.service = service;
        this.repo = repo;
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customers>> getAllCustomers(){
        return ResponseEntity.ok(service.getAllCustomers());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customers> getCustomerById(@PathVariable long id){
        Customers customer = service.getCustomerById(id);
        if(customer != null){
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/areas")
    public ResponseEntity<List<Map<String, Object>>> getAreasWithCustomerCount() {
        return ResponseEntity.ok(service.getAreasWithCustomerCount());
    }

    @GetMapping("/{areaName}/customers")
    public ResponseEntity<List<Customers>> getCustomersByAreaId(@PathVariable String areaName){
        return ResponseEntity.ok(service.getCustomerByAreaId(areaName));
    }

    @GetMapping("/stats")
    public ResponseEntity<CustomerStatsDTO> getcustomerCountAndBalance(){
        System.out.println(service.getcustomerCountAndBalance());
        return ResponseEntity.ok(service.getcustomerCountAndBalance());
    }

    @PatchMapping("/{id}/add-balance")
    public ResponseEntity<Customers> addBalance(@PathVariable long id, @RequestBody Map<String, BigDecimal> body) {
        BigDecimal amount = body.get("amount");
        return ResponseEntity.ok(service.addBalance(id, amount));
    }

    @PatchMapping("/{id}/completedPayment")
    public ResponseEntity<Customers> clearingBalance(@PathVariable long id, @RequestBody Map<String, BigDecimal> body) {
        BigDecimal amount = body.get("amount");
        return ResponseEntity.ok(service.clearingBalance(id, amount));
    }

    @PostMapping("/addingCustomer")
    public ResponseEntity<Customers> addingNewCustomer(@RequestBody Customers customer) {
        Customers saved = repo.save(customer);
        return ResponseEntity.ok(saved);
    }



    @PatchMapping("/updateDelivery/{id}")
    public ResponseEntity<Customers> markDelivered(@PathVariable long id, @RequestBody Map<String, Boolean> payload) {
        boolean delivered = payload.getOrDefault("delivery", Boolean.TRUE);
        Customers customer = repo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setDeliveredNot(delivered);
        Customers saved = repo.save(customer);
        return ResponseEntity.ok(saved);
    }
}