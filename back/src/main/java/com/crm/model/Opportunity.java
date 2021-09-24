package com.crm.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

// Step 1
@Entity
@Table(name = "opportunity")
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @ManyToOne
    private User currentOwner;

    @OneToOne
    @NotNull
    private Client client;

    @OneToOne
    @NotNull
    private FirstMeeting firstMeeting;

    @OneToOne
    @NotNull
    private Development development;

    @OneToOne
    @NotNull
    private POCDevelopment pocDevelopment;

    @OneToOne
    @NotNull
    private POCInstallation pocInstallation;

    @OneToOne
    @NotNull
    private Order order;

    @Column
    @NotNull
    private Stage stage;

    public Opportunity() { }

    public Opportunity(User currentOwner, Client client, Stage stage) {
        this.currentOwner = currentOwner;
        this.client = client;
        this.stage = stage;
        this.firstMeeting = new FirstMeeting();
        this.development = new Development();
        this.pocDevelopment = new POCDevelopment();
        this.pocInstallation = new POCInstallation();
        this.order = new Order();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getCurrentOwner() {
        return currentOwner;
    }

    public void setCurrentOwner(User currentOwner) {
        this.currentOwner = currentOwner;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public FirstMeeting getFirstMeeting() {
        return firstMeeting;
    }

    public void setFirstMeeting(FirstMeeting firstMeeting) {
        this.firstMeeting = firstMeeting;
    }

    public Development getDevelopment() {
        return development;
    }

    public void setDevelopment(Development development) {
        this.development = development;
    }

    public POCDevelopment getPocDevelopment() {
        return pocDevelopment;
    }

    public void setPocDevelopment(POCDevelopment pocDevelopment) {
        this.pocDevelopment = pocDevelopment;
    }

    public POCInstallation getPocInstallation() {
        return pocInstallation;
    }

    public void setPocInstallation(POCInstallation pocInstallation) {
        this.pocInstallation = pocInstallation;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }
}

