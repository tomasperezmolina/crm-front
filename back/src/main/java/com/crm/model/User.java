package com.crm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users",
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"email", "active"})
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int id;

    @NotNull
    @Column
    private String name;

    @Column
    private String lastName;

    @NotNull
    @Column
    private String email;

    @NotNull
    @Column
    private String password;

    @Column
    private boolean active;

    @NotNull
    @Column
    private UserType type;

    public User() { }

    public User(String name, String lastName, String email, @NotNull String password, boolean active, @NotNull UserType type) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.active = active;
        this.type = type;
    }

    @Override
    public String toString() {
        return this.getName() + " " + this.getLastName();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }
}
