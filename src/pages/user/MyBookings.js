import React, { useEffect, useState } from "react";
import api from "../../api/axios";

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
    fetchBookings(); // 🔥 refresh
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
const fetchBookings = async () => {
  const res = await api.get("/bookings/user");
  setBookings(res.data); // paid yahi aa raha hai
};

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id}>
          <p>{b.car.brand} - {b.car.model}</p>
          <p>Total: ₹{b.totalPrice}</p>
        <button onClick={() => cancelBooking(b.id)}
          disabled={b.status === "CANCELLED"}>
    Cancel
  </button>


  {b.paymentStatus === "PAID" ? (
    <span style={{ marginLeft: "10px", color: "green" }}>
      Paid ✅
    </span>
  ) : (
    <button
      style={{ marginLeft: "10px" }}
      onClick={() => payBooking(b.id)}
      disabled={b.paymentStatus === "PAID"}
    >
      Pay Now
    </button>
  )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
