package com.crm.model.form;

import com.crm.model.FirstMeeting;

import java.time.LocalDate;

public class FirstMeetingForm {
    private String notes;
    private String projectOwner;
    private LocalDate nextMeeting;
    private String othersInvolved;
    private String problem;
    private Integer employeeAmount;
    private String budgetStatus;
    private String locations;
    private LocalDate projectDate;
    private Integer projectDuration;

    public FirstMeetingForm() { }

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

    public void patch(FirstMeeting firstMeeting) {
        firstMeeting.setNotes(notes);
        firstMeeting.setProjectOwner(projectOwner);
        firstMeeting.setNextMeeting(nextMeeting);
        firstMeeting.setOthersInvolved(othersInvolved);
        firstMeeting.setProblem(problem);
        firstMeeting.setEmployeeAmount(employeeAmount);
        firstMeeting.setBudgetStatus(budgetStatus);
        firstMeeting.setLocations(locations);
        firstMeeting.setProjectDate(projectDate);
        firstMeeting.setProjectDuration(projectDuration);
    }
}
