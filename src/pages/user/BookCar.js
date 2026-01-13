import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import styles from "./BookCar.module.css";

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
      setError("Booking failed. Try again!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Book Your Car</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleBooking}>
          <div className={styles.formGroup}>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
                min={new Date().toISOString().split("T")[0]}  
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
                min={new Date().toISOString().split("T")[0]}  
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookCar;
