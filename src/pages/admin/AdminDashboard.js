import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
const AdminDashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  const fetchTotalUsers = async () => {
    const res = await api.get("/admin/users/count");
    setTotalUsers(res.data);
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <ul>
        <li><Link to="/admin/cars">Manage Cars</Link></li>
        <li><Link to="/admin/bookings">View Bookings</Link></li>
      </ul>
      <div className="card">
        <h3>Total Users</h3>
        <p>{totalUsers}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
