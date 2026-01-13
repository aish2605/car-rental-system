import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">🚗 CarRental</h2>
      </div>

      <div
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

     
      <ul className={`nav-right ${menuOpen ? "active" : ""}`}>
        {!auth.token && (
          <>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          </>
        )}

        {auth.token && auth.role === "ADMIN" && (
          <>
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/admin/cars" onClick={() => setMenuOpen(false)}>Manage Cars</Link></li>
            <li><Link to="/admin/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link></li>
          </>
        )}

        {auth.token && auth.role === "USER" && (
          <>
           <li><Link to="/user" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/cars" onClick={() => setMenuOpen(false)}>Cars</Link></li>
            <li><Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link></li>
          </>
        )}

        {auth.token && (
          <li>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
