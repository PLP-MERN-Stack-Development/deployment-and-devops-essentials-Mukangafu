import React, { useEffect, useState } from "react";
import { getBugs } from "../api";

export default function Dashboard() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    try {
      const { data } = await getBugs();
      setBugs(data);
    } catch (err) {
      console.error("Failed to load bugs", err);
    }
  };

  // Stats
  const total = bugs.length;
  const open = bugs.filter((b) => b.status === "open").length;
  const inProgress = bugs.filter((b) => b.status === "in-progress").length;
  const resolved = bugs.filter((b) => b.status === "resolved").length;

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview 👋</h1>
        <p className="text-gray-600 mt-1">
          Track your progress and manage your reported bugs easily.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total */}
        <div className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Total Bugs</h3>
          <p className="text-4xl font-bold mt-2">{total}</p>
        </div>

        {/* Open */}
        <div className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Open Bugs</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{open}</p>
        </div>

        {/* In Progress */}
        <div className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">In Progress</h3>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{inProgress}</p>
        </div>

        {/* Resolved */}
        <div className="bg-white p-6 border rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Resolved</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{resolved}</p>
        </div>
      </div>

      {/* Recent Bugs Section */}
      <div className="bg-white p-6 border rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Bugs</h2>
        </div>

        {bugs.length === 0 ? (
          <p className="text-gray-500 italic">No bugs reported yet.</p>
        ) : (
          <ul className="divide-y">
            {bugs.slice(0, 5).map((bug) => (
              <li key={bug._id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{bug.title}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    Status: {bug.status}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    bug.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : bug.priority === "low"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {bug.priority || "normal"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
