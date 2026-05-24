package com.company.employees.service;

import com.company.employees.dto.DepartmentRequestDTO;
import com.company.employees.dto.DepartmentResponseDTO;
import com.company.employees.model.Department;
import com.company.employees.repositories.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public DepartmentResponseDTO saveDepartment(DepartmentRequestDTO dto) {
        if (departmentRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Departamento já cadastrado");
        }
        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
        return toResponse(departmentRepository.save(department));
    }

    public DepartmentResponseDTO updateDepartment(Long id, DepartmentRequestDTO dto) {
        return departmentRepository.findById(id)
                .map(department -> {
                    if (!department.getName().equals(dto.getName())
                            && departmentRepository.existsByName(dto.getName())) {
                        throw new RuntimeException("Departamento já cadastrado");
                    }
                    department.setName(dto.getName());
                    department.setDescription(dto.getDescription());
                    return toResponse(departmentRepository.save(department));
                })
                .orElseThrow(() -> new RuntimeException("Departamento não encontrado"));
    }

    public DepartmentResponseDTO findByIdDepartment(Long id) {
        return departmentRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Departamento não encontrado"));
    }

    public List<DepartmentResponseDTO> findAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteByIdDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Departamento não encontrado");
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentResponseDTO toResponse(Department department) {
        return new DepartmentResponseDTO(
                department.getId(),
                department.getName(),
                department.getDescription()
        );
    }
}