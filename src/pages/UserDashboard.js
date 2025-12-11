import React from "react";
import "./Dashboard.css"; // optional CSS

const UserDashboard = () => {
  const username = localStorage.getItem("username"); // we will save username after login

  return (
    <div className="dashboard-container">
      <h2>Welcome, {username ? username : "User"} 👋</h2>
      <p>You can explore available cars and book them!</p>

      <div className="dashboard-actions">
        <button 
          className="btn" 
          onClick={() => (window.location.href = "/user/cars")}
        >
          View & Book Cars 🚗
        </button>

        <button 
          className="btn" 
          onClick={() => (window.location.href = "/user/bookings")}
        >
          My Bookings 📄
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
