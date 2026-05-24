package com.company.employees.repositories;

import com.company.employees.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    List<Employee> findByDepartmentId(Long departmentId);
}