package com.crm.model;

import javax.persistence.*;
import java.time.LocalDate;

// Step 2
@Entity
@Table(name = "firstmeeting")
public class FirstMeeting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @Column
    private String notes;

    @Column
    private String projectOwner;

    @Column
    private LocalDate nextMeeting;

    @Column
    private String othersInvolved;

    @Column
    private String problem;

    @Column
    private Integer employeeAmount;

    @Column
    private String budgetStatus;

    @Column
    private String locations;

    @Column
    private LocalDate projectDate;

    @Column
    private Integer projectDuration;

    @ManyToOne
    private User owner;

    public FirstMeeting() { }

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

    public String getProjectOwner() {
        return projectOwner;
    }

    public void setProjectOwner(String projectOwner) {
        this.projectOwner = projectOwner;
    }

    public LocalDate getNextMeeting() {
        return nextMeeting;
    }

    public void setNextMeeting(LocalDate nextMeeting) {
        this.nextMeeting = nextMeeting;
    }

    public String getOthersInvolved() {
        return othersInvolved;
    }

    public void setOthersInvolved(String othersInvolved) {
        this.othersInvolved = othersInvolved;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public Integer getEmployeeAmount() {
        return employeeAmount;
    }

    public void setEmployeeAmount(Integer employeeAmount) {
        this.employeeAmount = employeeAmount;
    }

    public String getBudgetStatus() {
        return budgetStatus;
    }

    public void setBudgetStatus(String budgetStatus) {
        this.budgetStatus = budgetStatus;
    }

    public String getLocations() {
        return locations;
    }

    public void setLocations(String locations) {
        this.locations = locations;
    }

    public LocalDate getProjectDate() {
        return projectDate;
    }

    public void setProjectDate(LocalDate projectDate) {
        this.projectDate = projectDate;
    }

    public Integer getProjectDuration() {
        return projectDuration;
    }

    public void setProjectDuration(Integer projectDuration) {
        this.projectDuration = projectDuration;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
