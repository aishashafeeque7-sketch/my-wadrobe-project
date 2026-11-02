import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Outfit Planner
      </Link>

      {user && (
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/wardrobe">My Wardrobe</Link>
          <Link to="/create-outfit">Create Outfit</Link>
          <span className="navbar-username">Hi, {user.name}</span>
          <button className="btn btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
