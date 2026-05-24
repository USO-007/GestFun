package com.company.employees.dto;

public class EmployeeResponseDTO {

    private final Long id;
    private final String name;
    private final String email;
    private final String phone;
    private final String address;
    private final String role;
    private final boolean status;
    private final String departmentName;

    public EmployeeResponseDTO(Long id, String name, String email, String phone,
                                String address, String role, boolean status, String departmentName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.status = status;
        this.departmentName = departmentName;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress() { return address; }
    public String getRole() { return role; }
    public boolean isStatus() { return status; }
    public String getDepartmentName() { return departmentName; }
}