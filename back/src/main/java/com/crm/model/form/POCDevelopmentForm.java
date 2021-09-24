package com.crm.model.form;

import com.crm.model.POCDevelopment;

import java.time.LocalDate;

public class POCDevelopmentForm {
    private Integer duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private String location;
    private String packets;
    private String notes;

    public POCDevelopmentForm() { }

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

    public void patch(POCDevelopment pocDevelopment) {
        pocDevelopment.setDuration(duration);
        pocDevelopment.setStartDate(startDate);
        pocDevelopment.setEndDate(endDate);
        pocDevelopment.setLocation(location);
        pocDevelopment.setPackets(packets);
        pocDevelopment.setNotes(notes);
    }
}
