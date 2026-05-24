import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// AUTH
// ============================================================

export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const registerAdmin = (data) =>
  api.post("/auth/register", data);

export const getAdmins = () =>
  api.get("/auth/admins");

export const updateAdmin = (id, data) =>
  api.put(`/auth/admins/${id}`, data);

export const deleteAdmin = (id) =>
  api.delete(`/auth/admins/${id}`);

// ============================================================
// EMPLOYEES
// ============================================================

export const getEmployees = () =>
  api.get("/employees");

export const getEmployeeById = (id) =>
  api.get(`/employees/${id}`);

export const createEmployee = (data) =>
  api.post("/employees", data);

export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);

export const deleteAllEmployees = () =>
  api.delete("/employees");

// ============================================================
// DEPARTMENTS
// ============================================================

export const getDepartments = () =>
  api.get("/departments");

export const getDepartmentById = (id) =>
  api.get(`/departments/${id}`);

export const getEmployeesByDepartment = (id) =>
  api.get(`/departments/${id}/employees`);

export const createDepartment = (data) =>
  api.post("/departments", data);

export const updateDepartment = (id, data) =>
  api.put(`/departments/${id}`, data);

export const deleteDepartment = (id) =>
  api.delete(`/departments/${id}`);

export default api;