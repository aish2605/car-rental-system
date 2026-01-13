import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await api.get("/bookings/user");
    setBookings(res.data);
  };

  const payBooking = async (bookingId) => {
    try {
      await api.post(`/bookings/pay/${bookingId}`);
      alert("Payment successful ✅");
      loadBookings();
    } catch (err) {
      alert("Payment failed ❌");
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await api.delete(`/bookings/cancel/${id}`);
    alert("Booking cancelled");
    loadBookings();
  };

  return (
    <div className="my-bookings">
      <h2 className="title">📦 My Bookings</h2>

      {bookings.length === 0 && (
        <p className="empty-text">No bookings found</p>
      )}

      <div className="booking-grid">
        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <h3>{b.car.brand} {b.car.model}</h3>

            <p className="price">₹{b.totalPrice}</p>

            <div className="status-row">
              <span className={`payment ${b.paymentStatus?.toLowerCase()}`}>
                {b.paymentStatus}
              </span>

              <span className={`booking-status ${b.status?.toLowerCase()}`}>
                {b.status}
              </span>
            </div>

            <div className="actions">
              <button
                className="btn cancel"
                onClick={() => cancelBooking(b.id)}
                disabled={b.status === "CANCELLED"}
              >
                Cancel
              </button>

              {b.paymentStatus === "PAID" ? (
                <span className="paid-label">Paid ✅</span>
              ) : (
                <button
                  className="btn pay"
                  onClick={() => payBooking(b.id)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
