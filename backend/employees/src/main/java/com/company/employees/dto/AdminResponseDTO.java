package com.company.employees.dto;

public class AdminResponseDTO {

    private Long id;
    private String username;

    public AdminResponseDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
}