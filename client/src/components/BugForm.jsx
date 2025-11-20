import { useState } from "react";

export default function BugForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ title, severity, description });
    setTitle("");
    setSeverity("low");
    setDescription("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-5 rounded shadow mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold"> Report a New Bug</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Bug Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="w-full border p-2 rounded"
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
      >
        <option value="low">Low Severity</option>
        <option value="medium">Medium Severity</option>
        <option value="high">High Severity</option>
      </select>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Describe the issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />

      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Bug
      </button>
    </form>
  );
}
