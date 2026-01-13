import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    cars: 0,
    bookings: 0,
    revenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await api.get("/users");
      const carsRes = await api.get("/cars");
      const bookingsRes = await api.get("/bookings/all");

      
      const revenueMap = {};
      bookingsRes.data.forEach((b) => {
        const date = b.startDate;
        revenueMap[date] = (revenueMap[date] || 0) + (b.totalPrice || 0);
      });

      setRevenueData(
        Object.keys(revenueMap).map((date) => ({
          date,
          revenue: revenueMap[date],
        }))
      );

      setStats({
        users: usersRes.data.length,
        cars: carsRes.data.length,
        bookings: bookingsRes.data.length,
        revenue: bookingsRes.data.reduce(
          (sum, b) => sum + (b.totalPrice || 0),
          0
        ),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p className="sub-text"></p>

      
      <div className="dashboard-cards">
        <div className="card clickable" onClick={() => navigate("/admin/users")}>
          <h3>USERS</h3>
          <p>{stats.users}</p>
        </div>

        <div className="card clickable" onClick={() => navigate("/admin/cars")}>
          <h3>CARS</h3>
          <p>{stats.cars}</p>
        </div>

        <div
          className="card clickable"
          onClick={() => navigate("/admin/bookings")}
        >
          <h3>BOOKINGS</h3>
          <p>{stats.bookings}</p>
        </div>

        <div className="card">
          <h3>REVENUE</h3>
          <p>₹ {stats.revenue}</p>
        </div>
      </div>

     
      <div className="graph-card">
        <h3>Revenue Overview</h3>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={revenueData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            barSize={22}
          >
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
