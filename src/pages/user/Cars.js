import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await api.get("/cars");
    setCars(res.data);
  };

  return (
    <div className="cars-container">
      <h2>Available Cars</h2>

      <div className="cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <img
              src={car.imageUrl}
              alt={car.brand}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />

            <h3>{car.brand} {car.model}</h3>
            <p>₹ {car.price_per_day} / day</p>

          
              <button onClick={() => navigate(`/book/${car.id}`)}>
                Book Car
              </button>
           
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
