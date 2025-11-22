import React, { useEffect, useState } from "react";
import { getBugs, deleteBug, updateBug } from "../api";

export default function MyBugs() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBugs = async () => {
    try {
      const { data } = await getBugs();
      setBugs(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load bugs:", err);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this bug?")) return;

    try {
      await deleteBug(id);
      loadBugs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete bug");
    }
  };

  const handleStatusChange = async (bug) => {
    const newStatus =
      bug.status === "open"
        ? "in-progress"
        : bug.status === "in-progress"
        ? "resolved"
        : "open";

    try {
      await updateBug(bug._id, { ...bug, status: newStatus });
      loadBugs();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading)
    return <div className="p-8 text-center text-gray-600">Loading bugs...</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Bugs</h1>

      {bugs.length === 0 ? (
        <p className="text-gray-500 italic">No bugs found.</p>
      ) : (
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border">Title</th>
              <th className="text-left p-3 border">Status</th>
              <th className="text-left p-3 border">Priority</th>
              <th className="text-left p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bugs.map((bug) => (
              <tr key={bug._id} className="border-b">
                <td className="p-3">{bug.title}</td>
                <td className="p-3 capitalize">{bug.status}</td>
                <td className="p-3 capitalize">{bug.priority}</td>

                <td className="p-3 flex gap-2">
                  {/* Update Status */}
                  <button
                    onClick={() => handleStatusChange(bug)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Next Status
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(bug._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
