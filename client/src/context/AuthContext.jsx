import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      console.error("AuthContext load error:", err);
    }
  }, []);

  // Login function
  const login = (data) => {
    try {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Logout function (redirects to HOME)
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to Home page
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
