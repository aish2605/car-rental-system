import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";


const AllBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="all-bookings">
      <h2>All Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>{b.user.name} booked {b.car.name} ({b.car.model}) on {b.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooking;
