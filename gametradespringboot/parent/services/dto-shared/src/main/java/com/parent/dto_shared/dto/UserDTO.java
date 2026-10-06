package com.parent.dto_shared.dto;

import com.parent.dto_shared.enums.City;

import java.time.LocalDateTime;

public class UserDTO {

    private Long id;

    private String names;

    private String lastnames;

    private String email;

    private String password;

    private String phoneNumber;

    private LocalDateTime dateOfBirth;

    private City city;

    public UserDTO() {
    }

    public UserDTO(Long id, String names, String lastnames, String email,
                   String password, String phoneNumber,
                   LocalDateTime dateOfBirth, City city) {

        this.id = id;
        this.names = names;
        this.lastnames = lastnames;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getLastnames() {
        return lastnames;
    }

    public void setLastnames(String lastnames) {
        this.lastnames = lastnames;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDateTime dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}