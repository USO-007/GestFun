package com.company.employees.dto;

import jakarta.validation.constraints.*;

public class EmployeeRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Pattern(
            regexp = "^[A-Za-zÀ-ÿ\\s]+$",
            message = "O nome deve conter apenas letras e espaços"
    )
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\d{9}", message = "O telefone deve ter 9 dígitos")
    private String phone;

    @NotBlank(message = "Endereço é obrigatório")
    private String address;

    @NotBlank(message = "Cargo é obrigatório")
    private String role;

    private boolean status;

    private Long departmentId;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isStatus() { return status; }
    public void setStatus(boolean status) { this.status = status; }

    public Long getDepartmentId() { return departmentId; }
    public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
}