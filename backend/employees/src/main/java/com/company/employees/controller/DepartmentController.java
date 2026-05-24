package com.company.employees.controller;

import com.company.employees.dto.DepartmentRequestDTO;
import com.company.employees.dto.DepartmentResponseDTO;
import com.company.employees.service.DepartmentService;
import com.company.employees.service.EmployeeService;
import com.company.employees.dto.EmployeeResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final EmployeeService employeeService;

    public DepartmentController(DepartmentService departmentService, EmployeeService employeeService) {
        this.departmentService = departmentService;
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponseDTO>> list() {
        return ResponseEntity.ok(departmentService.findAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.findByIdDepartment(id));
    }

    @GetMapping("/{id}/employees")
    public ResponseEntity<List<EmployeeResponseDTO>> listEmployees(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findByDepartment(id));
    }

    @PostMapping
    public ResponseEntity<DepartmentResponseDTO> create(@Valid @RequestBody DepartmentRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.saveDepartment(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponseDTO> update(@PathVariable Long id, @Valid @RequestBody DepartmentRequestDTO dto) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        departmentService.deleteByIdDepartment(id);
        return ResponseEntity.noContent().build();
    }
}