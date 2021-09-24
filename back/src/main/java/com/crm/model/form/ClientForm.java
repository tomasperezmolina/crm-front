package com.crm.model.form;

import com.crm.model.Client;

public class ClientForm {
    private String name;

    private String webpage;

    private String industry;

    private String companyType;

    private String region;

    private String notes;

    public ClientForm() { }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebpage() {
        return webpage;
    }

    public void setWebpage(String webpage) {
        this.webpage = webpage;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCompanyType() {
        return companyType;
    }

    public void setCompanyType(String companyType) {
        this.companyType = companyType;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void patch(Client client) {
        client.setName(name);
        client.setWebpage(webpage);
        client.setIndustry(industry);
        client.setCompanyType(companyType);
        client.setRegion(region);
        client.setNotes(notes);
    }
}
