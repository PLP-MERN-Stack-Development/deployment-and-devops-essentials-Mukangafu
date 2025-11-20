import React, { useContext } from "react";
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
  const { user, logout, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const activeClass = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-100 text-blue-700"
      : "hover:bg-blue-50 text-gray-700";

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">BugTracker</h1>
        </div>

        <nav className="flex-1 px-6 py-4">
          <ul className="space-y-2">

            <li>
              <Link
                to="/dashboard"
                className={`block p-2 rounded font-medium ${activeClass("/dashboard")}`}
              >
                My Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/my-bugs"
                className={`block p-2 rounded font-medium ${activeClass("/dashboard/my-bugs")}`}
              >
                My Bugs
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/report"
                className={`block p-2 rounded font-medium ${activeClass("/dashboard/report")}`}
              >
                Report Bug
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/settings"
                className={`block p-2 rounded font-medium ${activeClass("/dashboard/settings")}`}
              >
                My Settings
              </Link>
            </li>

          </ul>
        </nav>

        <div className="px-6 py-4 border-t">
          <button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            className="w-full text-left text-red-600 font-semibold hover:underline"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {user?.username}
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
