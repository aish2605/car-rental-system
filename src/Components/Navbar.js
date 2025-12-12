import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>Car Rental</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
           <li><Link to="/contact">Contact</Link></li>
        {auth.isLoggedIn && auth.role === "ADMIN" && <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>}
        {auth.isLoggedIn && auth.role === "USER" && <li><Link to="/user/dashboard">Dashboard</Link></li>}
        {!auth.isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!auth.isLoggedIn && <li><Link to="/register">Register</Link></li>}
        {auth.isLoggedIn && <li>Welcome, {auth.name}</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
