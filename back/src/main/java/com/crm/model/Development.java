package com.crm.model;

import javax.persistence.*;

// Step 3
@Entity
@Table(name = "development")
public class Development {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private Integer licenseAmount;

    @Column
    private Integer packetAmount;

    @Column
    private String principalArea;

    @Column
    private String packs;

    @Column
    private String notes;

    @ManyToOne
    private User owner;

    public Development() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getLicenseAmount() {
        return licenseAmount;
    }

    public void setLicenseAmount(Integer licenseAmount) {
        this.licenseAmount = licenseAmount;
    }

    public Integer getPacketAmount() {
        return packetAmount;
    }

    public void setPacketAmount(Integer packetAmount) {
        this.packetAmount = packetAmount;
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

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
