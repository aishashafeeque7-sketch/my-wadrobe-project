// This file lets any page in our app know:
// "Is someone logged in right now, and who are they?"

import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // When the app first loads, check if we already saved a user in localStorage
  const savedUser = localStorage.getItem("user");

  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  // Call this after a successful login or signup
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Call this to log the user out
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A small custom hook so pages can just write: const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
