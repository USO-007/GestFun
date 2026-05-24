package com.company.employees.dto;

import jakarta.validation.constraints.*;

public class AdminRequestDTO {

    @NotBlank(message = "Username é obrigatório")
    private String username;

    @NotBlank(message = "Password é obrigatória")
    @Size(min = 8, message = "Password deve ter no mínimo 8 caracteres")
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}