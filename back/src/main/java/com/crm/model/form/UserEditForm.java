package com.crm.model.form;

import com.crm.model.User;

public class UserEditForm {

    private String name;
    private String lastName;
    private String email;

    public UserEditForm() { }

    public UserEditForm(String name, String lastName, String username, String email) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void patch(User entity) {
        entity.setName(this.name);
        entity.setLastName(this.lastName);
        entity.setEmail(this.email);
    }
}
