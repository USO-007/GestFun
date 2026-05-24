package com.company.employees.service;

import com.company.employees.dto.AdminRequestDTO;
import com.company.employees.dto.AdminResponseDTO;
import com.company.employees.model.Admin;
import com.company.employees.repositories.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean login(String username, String password) {
        return adminRepository.findByUsername(username)
                .map(admin -> passwordEncoder.matches(password, admin.getPassword()))
                .orElse(false);
    }

    public AdminResponseDTO saveAdmin(AdminRequestDTO dto) {

        long totalAdmins = adminRepository.count();

        if (adminRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username já cadastrado");
        }
        Admin admin = new Admin();
        admin.setUsername(dto.getUsername());
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        return toResponse(adminRepository.save(admin));
    }

    public AdminResponseDTO updateAdmin(Long id, AdminRequestDTO dto) {
        return adminRepository.findById(id)
                .map(admin -> {
                    if (!admin.getUsername().equals(dto.getUsername())
                            && adminRepository.existsByUsername(dto.getUsername())) {
                        throw new RuntimeException("Username já cadastrado");
                    }
                    admin.setUsername(dto.getUsername());
                    admin.setPassword(passwordEncoder.encode(dto.getPassword()));
                    return toResponse(adminRepository.save(admin));
                })
                .orElseThrow(() -> new RuntimeException("Admin não encontrado"));
    }

    public List<AdminResponseDTO> findAllAdmins() {
        return adminRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteAdmin(Long id) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("Admin não encontrado");
        }
        adminRepository.deleteById(id);
    }

    private AdminResponseDTO toResponse(Admin admin) {
        return new AdminResponseDTO(admin.getId(), admin.getUsername());
    }
}