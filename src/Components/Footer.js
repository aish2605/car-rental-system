import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Car Rental System | Designed by You 🚗✨</p>
    </footer>
  );
};

export default Footer;
