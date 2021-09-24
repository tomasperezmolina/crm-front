package com.crm.model;

import javax.persistence.*;
import java.util.List;

// Step 1
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private String name;

    @Column
    private String webpage;

    @Column
    private String industry;

    @Column
    private String companyType;

    @Column
    private String region;

    @Column
    private String notes;

    @OneToMany
    private List<ClientContact> clientContacts;

    @ManyToOne
    private User owner;

    public Client() { }

    public Client(String name, String webpage, String industry, String companyType, String region, String notes, List<ClientContact> clientContacts, User owner) {
        this.name = name;
        this.webpage = webpage;
        this.industry = industry;
        this.companyType = companyType;
        this.region = region;
        this.notes = notes;
        this.clientContacts = clientContacts;
        this.owner = owner;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public List<ClientContact> getClientContacts() {
        return clientContacts;
    }

    public void setClientContacts(List<ClientContact> clientContacts) {
        this.clientContacts = clientContacts;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
