import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const BookCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // save during login

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bookings/book", {
        carId,
        userId,
        startDate,
        endDate,
      });

      alert("Car booked successfully 🚗");
      navigate("/my-bookings");
    } catch (err) {
      setError("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Car</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleBooking}>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <br />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookCar;
