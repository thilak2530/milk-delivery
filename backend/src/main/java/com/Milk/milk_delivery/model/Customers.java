package com.Milk.milk_delivery.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "customers")
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String street_name;
    private String usual_milk;
    private String house_no;
    private String phoneNumber;
    private String note;
    private BigDecimal balance = BigDecimal.ZERO;
    private BigDecimal ratePerLitre = BigDecimal.ZERO;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "delivered_not", nullable = false)
    private boolean deliveredNot = false;

    // Getters and setters (or use Lombok)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStreet_name() { return street_name; }
    public void setStreet_name(String street_name) { this.street_name = street_name; }

    public String getUsual_milk() { return usual_milk; }
    public void setUsual_milk(String usual_milk) { this.usual_milk = usual_milk; }

    public String getHouse_no() { return house_no; }
    public void setHouse_no(String house_no) { this.house_no = house_no; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public BigDecimal getRatePerLitre() { return ratePerLitre; }
    public void setRatePerLitre(BigDecimal ratePerLitre) { this.ratePerLitre = ratePerLitre; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public boolean isDeliveredNot() { return deliveredNot; }
    public void setDeliveredNot(boolean deliveredNot) { this.deliveredNot = deliveredNot; }
}