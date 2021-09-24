package com.crm.model.form;

import com.crm.model.Order;

public class OrderForm {
    private Float price;
    private Integer cuit;
    private String socialReason;
    private String address;
    private String paymentMethod;
    private String paymentTerms;
    private Integer licenseAmount;
    private String licenseDescription;
    private String licenceCode;

    public OrderForm() { }

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

    public void patch(Order order) {
        order.setPrice(price);
        order.setCuit(cuit);
        order.setSocialReason(socialReason);
        order.setAddress(address);
        order.setPaymentMethod(paymentMethod);
        order.setPaymentTerms(paymentTerms);
        order.setLicenseAmount(licenseAmount);
        order.setLicenseDescription(licenseDescription);
        order.setLicenceCode(licenceCode);
    }
}
