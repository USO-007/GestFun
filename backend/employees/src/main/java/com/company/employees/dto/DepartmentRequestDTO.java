package com.company.employees.dto;

import jakarta.validation.constraints.*;

public class DepartmentRequestDTO {

    @NotBlank(message = "Nome do departamento é obrigatório")
    private String name;

    @NotBlank(message = "Descrição é obrigatória")
    private String description;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}