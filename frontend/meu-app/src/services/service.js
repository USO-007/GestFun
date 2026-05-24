import {
  login,
  registerAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  deleteAllEmployees,
  getDepartments,
  getDepartmentById,
  getEmployeesByDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./api";

// ============================================================
// AUTH
// ============================================================

export const authService = {
  login: (username, password) =>
    login(username, password).then((res) => res.data),

  registerAdmin: (data) =>
    registerAdmin(data).then((res) => res.data),

  getAdmins: () =>
    getAdmins().then((res) => res.data),

  updateAdmin: (id, data) =>
    updateAdmin(id, data).then((res) => res.data),

  deleteAdmin: (id) =>
    deleteAdmin(id).then((res) => res.data),
};

// ============================================================
// EMPLOYEES
// ============================================================

export const employeeService = {
  getAll: () =>
    getEmployees().then((res) => res.data),

  getById: (id) =>
    getEmployeeById(id).then((res) => res.data),

  create: (data) =>
    createEmployee(data).then((res) => res.data),

  update: (id, data) =>
    updateEmployee(id, data).then((res) => res.data),

  delete: (id) =>
    deleteEmployee(id).then((res) => res.data),

  deleteAll: () =>
    deleteAllEmployees().then((res) => res.data),
};

// ============================================================
// DEPARTMENTS
// ============================================================

export const departmentService = {
  getAll: () =>
    getDepartments().then((res) => res.data),

  getById: (id) =>
    getDepartmentById(id).then((res) => res.data),

  getEmployees: (id) =>
    getEmployeesByDepartment(id).then((res) => res.data),

  create: (data) =>
    createDepartment(data).then((res) => res.data),

  update: (id, data) =>
    updateDepartment(id, data).then((res) => res.data),

  delete: (id) =>
    deleteDepartment(id).then((res) => res.data),
};