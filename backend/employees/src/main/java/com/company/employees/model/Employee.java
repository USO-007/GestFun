package com.company.employees.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    public Employee() {}

    public Long getId() { return id; }

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

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}