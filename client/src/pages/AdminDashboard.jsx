import React, { useEffect, useState } from "react";
import { getAdminBugs, getAdminUsers } from "../api";

export default function AdminDashboard() {
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: bugsData } = await getAdminBugs();   // ✅ ADMIN BUGS
      const { data: usersData } = await getAdminUsers(); // ✅ ADMIN USERS

      setBugs(bugsData);
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  const totalBugs = bugs.length;
  const openBugs = bugs.filter((b) => b.status === "open").length;
  const progressBugs = bugs.filter((b) => b.status === "in-progress").length;
  const resolvedBugs = bugs.filter((b) => b.status === "resolved").length;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of all system activity.</p>
      </div>

      {/* Bug Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-1">Total Bugs</h3>
          <p className="text-3xl font-bold">{totalBugs}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-1">Open Bugs</h3>
          <p className="text-3xl font-bold text-blue-600">{openBugs}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-1">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{progressBugs}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm mb-1">Resolved Bugs</h3>
          <p className="text-3xl font-bold text-green-600">{resolvedBugs}</p>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white p-6 shadow rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>

        <table className="w-full text-left border">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize font-semibold text-blue-600">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bug List Table */}
      <div className="bg-white p-6 shadow rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">All Bugs</h2>

        <table className="w-full border text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Reported By</th>
            </tr>
          </thead>

          <tbody>
            {bugs.map((bug) => (
              <tr key={bug._id} className="border-b">
                <td className="p-3">{bug.title}</td>
                <td className="p-3 capitalize">{bug.status}</td>
                <td className="p-3 text-red-600">{bug.priority}</td>
                <td className="p-3">{bug.user?.username || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
