import React, { useEffect, useState } from "react";
import { getAdminBugs, getAdminUsers, deleteBugAdmin, updateBugAdmin } from "../api";

export default function AdminBugs() {
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);

  const load = async () => {
    const { data: bugList } = await getAdminBugs();
    const { data: userList } = await getAdminUsers();
    setBugs(bugList);
    setUsers(userList);
  };

  useEffect(() => {
    load();
  }, []);

  const updateBug = async (id, field, value) => {
    await updateBugAdmin(id, { [field]: value });
    load();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Reported Bugs</h1>

      <table className="w-full border text-left bg-white shadow rounded">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bugs.map((bug) => (
            <tr key={bug._id} className="border-b">
              <td className="p-3">{bug.title}</td>

              {/* STATUS SELECT */}
              <td className="p-3">
                <select
                  className="border p-1"
                  value={bug.status}
                  onChange={(e) => updateBug(bug._id, "status", e.target.value)}
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>

              {/* PRIORITY */}
              <td className="p-3">
                <select
                  className="border p-1"
                  value={bug.priority}
                  onChange={(e) => updateBug(bug._id, "priority", e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>

              {/* ASSIGN */}
              <td className="p-3">
                <select
                  className="border p-1"
                  value={bug.assignedTo?._id || ""}
                  onChange={(e) => updateBug(bug._id, "assignedTo", e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.username}
                    </option>
                  ))}
                </select>
              </td>

              {/* DELETE */}
              <td className="p-3">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteBugAdmin(bug._id).then(load)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
