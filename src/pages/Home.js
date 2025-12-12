import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  // Fetch car list from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:8080/cars"); // replace with your backend endpoint
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  const handleBook = (carId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/user/book/${carId}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Car Rental System 🚗</h1>
      <p>
        Rent your dream car easily! Browse through our cars and book with a few clicks.
      </p>

      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>

      <div className="cars-section">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div className="car-card" key={car.id}>
              <img
                src={car.imageUrl || "https://via.placeholder.com/250x150"}
                alt={car.name}
              />
              <h3>{car.name}</h3>
              <p>Type: {car.type}</p>
              <p>Price: ₹{car.pricePerDay}/day</p>
              <button onClick={() => handleBook(car.id)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No cars available currently.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
