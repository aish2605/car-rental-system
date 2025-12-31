import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">🚗 CarRental</h2>
      </div>

      <ul className="nav-right">
        {!auth.token && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {auth.token && auth.role === "ADMIN" && (
          <>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/cars">Manage Cars</Link></li>
            <li><Link to="/admin/bookings">Bookings</Link></li>
          </>
        )}

        {auth.token && auth.role === "USER" && (
          <>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
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
