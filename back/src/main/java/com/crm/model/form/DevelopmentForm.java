package com.crm.model.form;

import com.crm.model.Development;

public class DevelopmentForm {
    private Integer licenseAmount;
    private Integer packAmount;
    private String principalArea;
    private String packs;
    private String notes;

    public DevelopmentForm() { }

    public Integer getLicenseAmount() {
        return licenseAmount;
    }

    public void setLicenseAmount(Integer licenseAmount) {
        this.licenseAmount = licenseAmount;
    }

    public Integer getPackAmount() {
        return packAmount;
    }

    public void setPackAmount(Integer packAmount) {
        this.packAmount = packAmount;
    }

    public String getPrincipalArea() {
        return principalArea;
    }

    public void setPrincipalArea(String principalArea) {
        this.principalArea = principalArea;
    }

    public String getPacks() {
        return packs;
    }

    public void setPacks(String packs) {
        this.packs = packs;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void patch(Development development) {
        development.setLicenseAmount(licenseAmount);
        development.setPackAmount(packAmount);
        development.setPrincipalArea(principalArea);
        development.setPacks(packs);
        development.setNotes(notes);
    }
}
