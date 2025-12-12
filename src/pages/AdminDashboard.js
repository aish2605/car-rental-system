import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axiosInstance.get("/cars");
      setCars(res.data);
    };
    const fetchBookings = async () => {
      const res = await axiosInstance.get("/bookings");
      setBookings(res.data);
    };
    fetchCars();
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Cars</h3>
      <ul>
        {cars.map(car => (
          <li key={car.id}>{car.name} - {car.model} - ${car.pricePerDay}</li>
        ))}
      </ul>

      <h3>Bookings</h3>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>{b.user.name} booked {b.car.name} on {b.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
