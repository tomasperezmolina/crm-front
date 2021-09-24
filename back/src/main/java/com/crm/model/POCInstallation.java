package com.crm.model;

import javax.persistence.*;

// Step 5
@Entity
@Table(name = "pocinstallation")
public class POCInstallation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private String notes;

    @ManyToOne
    private User owner;

    public POCInstallation() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
