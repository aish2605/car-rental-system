import React from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">

      <div className="welcome-card">
        <h2>Welcome 👋</h2>
        
      </div>

    
      <div className="actions">
        <DashboardCard
          title="Browse Cars"
          text="View all available cars"
          link="/cars"
        />
        <DashboardCard
          title="My Bookings"
          text="Check your bookings"
          link="/my-bookings"
        />
        <DashboardCard
          title="My Profile"
          text="View your profile"
          link="/profile"
        />
      </div>

      
      <div className="info">
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Affordable prices</li>
          <li> Well maintained cars</li>
          <li> Easy booking process</li>
        </ul>
      </div>

    </div>
  );
};

const DashboardCard = ({ title, text, link }) => (
  <Link to={link} style={{ textDecoration: "none" }}>
    <div className="action-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </Link>
);

export default UserDashboard;
