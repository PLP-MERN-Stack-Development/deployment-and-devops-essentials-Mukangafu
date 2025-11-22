import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser({ username, email, password });

      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input 
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input 
            type="email"
            className="w-full p-3 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input 
            type="password"
            className="w-full p-3 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account? 
          <Link to="/login" className="text-blue-600"> Login</Link>
        </p>
      </div>
    </div>
  );
}
