import React, { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow flex flex-col">
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-3">

          <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-red-50">
            Dashboard
          </Link>

          <Link to="/admin/bugs" className="block p-2 rounded hover:bg-red-50">
            All Bugs
          </Link>

          <Link to="/admin/users" className="block p-2 rounded hover:bg-red-50">
            User Management
          </Link>

        </nav>

        <div className="px-6 py-4 border-t">
          <button
            onClick={() => { logout(); window.location.href = "/"; }}
            className="w-full text-left text-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Right content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}
