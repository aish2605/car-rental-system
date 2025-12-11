import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = ({ car }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    carName: car?.name || "",
    startDate: "",
    endDate: "",
    notes: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate) {
      setMessage("Start date and End date are required");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({ ...form, user: localStorage.getItem("username") });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    setMessage("Booking Successful!");
    setTimeout(() => navigate("/user/bookings"), 1500);
  };

  return (
    <div className="booking-container">
      <h2>Book Car: {form.carName}</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />

        <label>End Date:</label>
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />

        <label>Notes (Optional):</label>
        <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
