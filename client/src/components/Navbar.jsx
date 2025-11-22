import React from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = React.useContext(AuthContext);

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">User Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{user.username}</span>
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
}
