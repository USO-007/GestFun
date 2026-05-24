package com.company.employees.controller;

import com.company.employees.dto.AdminRequestDTO;
import com.company.employees.dto.AdminResponseDTO;
import com.company.employees.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AdminService adminService;

    public AuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        boolean success = adminService.login(username, password);

        if (success) {
            return ResponseEntity.ok(Map.of("message", "LOGIN_SUCCESS"));
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Credenciais inválidas"));
    }

    //Future Implementations in version 0.1
    @PostMapping("/register")
    public ResponseEntity<AdminResponseDTO> register(@Valid @RequestBody AdminRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.saveAdmin(dto));
    }

    @GetMapping("/admins")
    public ResponseEntity<List<AdminResponseDTO>> listAdmins() {
        return  ResponseEntity.ok(adminService.findAllAdmins());
    }

    @PutMapping("/admins/{id}")
    public ResponseEntity<AdminResponseDTO> updateAdmin(@PathVariable Long id, @Valid @RequestBody AdminRequestDTO dto) {
        return ResponseEntity.ok(adminService.updateAdmin(id, dto));
    }

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}