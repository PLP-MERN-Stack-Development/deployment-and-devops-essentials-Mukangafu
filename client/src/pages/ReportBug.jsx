import React, { useState, useContext } from "react";
import { createBug } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function ReportBug() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBug({
        title,
        description,
        priority,
        createdBy: user.id,
        status: "open",
      });

      setMessage("Bug reported successfully!");
      setTitle("");
      setDescription("");
      setPriority("normal");
    } catch (err) {
      setMessage("Failed to submit bug.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Report a Bug</h1>

      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-3 border rounded"
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 border rounded"
          placeholder="Bug description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="low">Low Priority</option>
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Submit Bug
        </button>
      </form>
    </div>
  );
}
