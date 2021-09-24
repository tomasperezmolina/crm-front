package com.crm.model;

import javax.persistence.*;
import java.time.LocalDate;

// Step 4
@Entity
@Table(name = "pocdevelopment")
public class POCDevelopment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private Integer duration;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String location;

    @Column
    private String packets;

    @Column
    private String notes;

    @ManyToOne
    private User owner;

    public POCDevelopment() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPackets() {
        return packets;
    }

    public void setPackets(String packets) {
        this.packets = packets;
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
