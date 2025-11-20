import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

/* ============================
        AUTH ROUTES
=============================== */

// Login
export const loginUser = (data) =>
  API.post("/api/auth/login", data);

// Register
export const registerUser = (data) =>
  API.post("/api/auth/register", data);

// Update user profile
export const updateUser = (id, data) =>
  API.put(`/api/auth/update/${id}`, data);

// Change password
export const changePassword = (data) =>
  API.post("/api/auth/change-password", data);

// Delete account
export const deleteAccount = (id) =>
  API.delete(`/api/auth/delete/${id}`);

/* ============================
        BUG ROUTES (USER)
=============================== */

// Get all bugs for logged-in user
export const getBugs = () => API.get("/api/bugs");

// Create a bug
export const createBug = (bug) =>
  API.post("/api/bugs", bug);

// Update a bug
export const updateBug = (id, updated) =>
  API.put(`/api/bugs/${id}`, updated);

// Delete a bug
export const deleteBug = (id) =>
  API.delete(`/api/bugs/${id}`);

/* ============================
        ADMIN ROUTES
=============================== */

// Dashboard stats
export const getAdminStats = () =>
  API.get("/api/admin/stats");

// All bugs in system
export const getAdminBugs = () =>
  API.get("/api/admin/bugs");

// Delete ANY bug
export const deleteBugAdmin = (id) =>
  API.delete(`/api/admin/bugs/${id}`);

// Fetch all users
export const getAdminUsers = () =>
  API.get("/api/admin/users");

// ⭐ UPDATE BUG AS ADMIN (status, priority, assignment, notes)
export const updateBugAdmin = (id, data) =>
  API.put(`/api/admin/bugs/${id}`, data);
