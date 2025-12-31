import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Car Rental System</h1>
      <p>Book cars easily. Admin manages cars & bookings.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ marginRight: "20px" }}>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
