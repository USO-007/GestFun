package com.company.employees.service;

import com.company.employees.dto.EmployeeRequestDTO;
import com.company.employees.dto.EmployeeResponseDTO;
import com.company.employees.model.Department;
import com.company.employees.model.Employee;
import com.company.employees.repositories.DepartmentRepository;
import com.company.employees.repositories.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    
    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    public EmployeeResponseDTO saveEmployee(EmployeeRequestDTO dto) {
        if (employeeRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        if(employeeRepository.existsByPhone(dto.getPhone())) {
            throw new RuntimeException("Número já cadastrado");
        }
        return toResponse(employeeRepository.save(toEntity(dto)));
    }

    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    if (!employee.getEmail().equals(dto.getEmail())
                            && employeeRepository.existsByEmail(dto.getEmail())) {
                        throw new RuntimeException("Email já cadastrado");
                    }
                    employee.setName(dto.getName());
                    employee.setEmail(dto.getEmail());
                    employee.setPhone(dto.getPhone());
                    employee.setAddress(dto.getAddress());
                    employee.setRole(dto.getRole());
                    employee.setStatus(dto.isStatus());
                    employee.setDepartment(findDepartment(dto.getDepartmentId()));
                    return toResponse(employeeRepository.save(employee));
                })
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
    }

    public EmployeeResponseDTO findByIdEmployee(Long id) {
        return employeeRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
    }

    public List<EmployeeResponseDTO> findAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<EmployeeResponseDTO> findByDepartment(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteByIdEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Funcionário não encontrado");
        }
        employeeRepository.deleteById(id);
    }

    public void deleteAllEmployees() {
        employeeRepository.deleteAll();
    }

    private Department findDepartment(Long departmentId) {
        if (departmentId == null) return null;
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Departamento não encontrado"));
    }

    private Employee toEntity(EmployeeRequestDTO dto) {
        Employee employee = new Employee();
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setAddress(dto.getAddress());
        employee.setRole(dto.getRole());
        employee.setStatus(dto.isStatus());
        employee.setDepartment(findDepartment(dto.getDepartmentId()));
        return employee;
    }

    private EmployeeResponseDTO toResponse(Employee employee) {
        String departmentName = employee.getDepartment() != null
                ? employee.getDepartment().getName()
                : null;
        return new EmployeeResponseDTO(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getAddress(),
                employee.getRole(),
                employee.isStatus(),
                departmentName
        );
    }
}