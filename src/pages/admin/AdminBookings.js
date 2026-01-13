import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminBooking.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/all")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="admin-bookings">
      <h2 className="title">📋 All Bookings</h2>

      {bookings.length === 0 && (
        <p className="empty-text">No bookings found</p>
      )}

      <div className="booking-grid">
        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="row">
              <span className="label">User</span>
              <span>{b.user.email}</span>
            </div>

            <div className="row">
              <span className="label">Car</span>
              <span>{b.car.brand} {b.car.model}</span>
            </div>

            <div className="row">
              <span className="label">Dates</span>
              <span>{b.startDate} → {b.endDate}</span>
            </div>

            <div className="row">
              <span className="label">Total Price</span>
              <span className="price">₹{b.totalPrice}</span>
            </div>

            <div className="row">
              <span className="label">Payment Status</span>
              <span className={`status ${b.paymentStatus?.toLowerCase()}`}>
                {b.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
