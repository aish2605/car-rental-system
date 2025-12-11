import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const adminName = localStorage.getItem("username");

  return (
    <div className="admin-dashboard-container">
      <h2>Welcome Admin, {adminName ? adminName : "Admin"} 👋</h2>
      <p>Manage your system operations below</p>

      <div className="admin-actions">
        <button
          className="admin-btn"
          onClick={() => (window.location.href = "/admin/cars")}
        >
          Manage Cars 🚘
        </button>

        <button
          className="admin-btn"
          onClick={() => (window.location.href = "/admin/bookings")}
        >
          View Bookings 📝
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
