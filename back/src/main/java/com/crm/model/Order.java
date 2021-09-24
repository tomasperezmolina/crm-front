package com.crm.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

// Step 6
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private Float price;

    @Column
    private Integer cuit;

    @Column
    private String socialReason;

    @Column
    private String address;

    @Column
    private String paymentMethod;

    @Column
    private String paymentTerms;

    @Column
    private Integer licenseAmount;

    @Column
    private String licenseDescription;

    @Column
    private String licenceCode;

    @ManyToOne
    private User owner;

    public Order() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getCuit() {
        return cuit;
    }

    public void setCuit(Integer cuit) {
        this.cuit = cuit;
    }

    public String getSocialReason() {
        return socialReason;
    }

    public void setSocialReason(String socialReason) {
        this.socialReason = socialReason;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public Integer getLicenseAmount() {
        return licenseAmount;
    }

    public void setLicenseAmount(Integer licenseAmount) {
        this.licenseAmount = licenseAmount;
    }

    public String getLicenseDescription() {
        return licenseDescription;
    }

    public void setLicenseDescription(String licenseDescription) {
        this.licenseDescription = licenseDescription;
    }

    public String getLicenceCode() {
        return licenceCode;
    }

    public void setLicenceCode(String licenceCode) {
        this.licenceCode = licenceCode;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}

