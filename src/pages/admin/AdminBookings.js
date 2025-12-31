import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/all")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>

      {bookings.map(b => (
        <div key={b.id} style={{border:"1px solid #ccc", margin:10, padding:10}}>
          <p>User: {b.user.email}</p>
          <p>Car: {b.car.brand} {b.car.model}</p>
          <p>Dates: {b.startDate} → {b.endDate}</p>
          <p>Total Price: ₹{b.totalPrice}</p>
           <p>Payment Status: ₹{b.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
