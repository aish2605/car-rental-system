import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">CarRental</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/user/dashboard">Dashboard</Link>
            </li>
            <li className="welcome-text">Hi, {username}</li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

