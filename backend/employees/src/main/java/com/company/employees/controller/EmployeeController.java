package com.company.employees.controller;

import com.company.employees.dto.EmployeeRequestDTO;
import com.company.employees.dto.EmployeeResponseDTO;
import com.company.employees.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> list() {
        return ResponseEntity.ok(employeeService.findAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findByIdEmployee(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@Valid @RequestBody EmployeeRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.saveEmployee(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(@PathVariable Long id, @Valid @RequestBody EmployeeRequestDTO dto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        employeeService.deleteByIdEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        employeeService.deleteAllEmployees();
        return ResponseEntity.noContent().build();
    }
}