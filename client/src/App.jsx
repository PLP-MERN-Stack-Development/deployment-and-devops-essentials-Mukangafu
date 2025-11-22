import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Layout + Pages
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyBugs from "./pages/MyBugs";
import ReportBug from "./pages/ReportBug";
import Settings from "./pages/Settings";

// Admin Layout + Pages
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBugs from "./pages/AdminBugs";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            user?.role === "user" ? (
              <Layout />
            ) : user?.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="my-bugs" element={<MyBugs />} />
          <Route path="report" element={<ReportBug />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminLayout />
            ) : user?.role === "user" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} /> {/* FIX */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="bugs" element={<AdminBugs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
