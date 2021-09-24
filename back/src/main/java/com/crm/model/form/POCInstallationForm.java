package com.crm.model.form;

import com.crm.model.POCInstallation;

public class POCInstallationForm {
    private String notes;

    public POCInstallationForm() { }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void patch(POCInstallation pocInstallation) {
        pocInstallation.setNotes(notes);
    }
}
