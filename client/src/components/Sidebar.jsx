import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = React.useContext(AuthContext);

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="px-6 py-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">BugTracker</h1>
      </div>

      <nav className="flex-1 px-6 py-4">
        <ul className="space-y-2">
          <li><Link className="block p-2 hover:bg-blue-50" to="/dashboard">Dashboard</Link></li>
          <li><Link className="block p-2 hover:bg-blue-50" to="/my-bugs">My Bugs</Link></li>
          <li><Link className="block p-2 hover:bg-blue-50" to="/report-bug">Report Bug</Link></li>
        </ul>
      </nav>

      <div className="px-6 py-4 border-t">
        <button onClick={logout} className="w-full text-left text-red-600 font-semibold">
          Logout
        </button>
      </div>
    </aside>
  );
}
