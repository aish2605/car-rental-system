import React, { useEffect, useState } from "react";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(allBookings);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx}>
                <td>{b.user}</td>
                <td>{b.carName}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>{b.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllBookings;
