import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import "./CarManagement.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", model: "", pricePerDay: "" });

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddCar = async () => {
    try {
      await axiosInstance.post("/cars", form);
      setForm({ name: "", model: "", pricePerDay: "" });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="car-management">
      <h2>Manage Cars</h2>

      <div className="add-car-form">
        <input name="name" placeholder="Car Name" value={form.name} onChange={handleChange} />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} />
        <input name="pricePerDay" placeholder="Price per day" value={form.pricePerDay} onChange={handleChange} />
        <button onClick={handleAddCar}>Add Car</button>
      </div>

      <h3>Existing Cars</h3>
      <ul>
        {cars.map(car => (
          <li key={car.id}>{car.name} - {car.model} - ${car.pricePerDay}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarManagement;
