import React, { useEffect, useState } from "react";
import { getAdminUsers } from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await getAdminUsers();
    setUsers(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <table className="w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-3 border">{u.username}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
