import React, { useState, useEffect } from "react";
import "./CarManagement.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Dummy data for now
  useEffect(() => {
    const dummyCars = [
      { id: 1, name: "Honda City", brand: "Honda", price: 2500 },
      { id: 2, name: "Hyundai Creta", brand: "Hyundai", price: 3500 },
    ];
    setCars(dummyCars);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.brand || !form.price) return alert("All fields required!");

    if (editingId) {
      // Edit existing car
      setCars(
        cars.map((car) =>
          car.id === editingId ? { ...car, name: form.name, brand: form.brand, price: form.price } : car
        )
      );
      setEditingId(null);
    } else {
      // Add new car
      const newCar = {
        id: cars.length + 1,
        name: form.name,
        brand: form.brand,
        price: form.price,
      };
      setCars([...cars, newCar]);
    }

    setForm({ name: "", brand: "", price: "" });
  };

  const handleEdit = (car) => {
    setEditingId(car.id);
    setForm({ name: car.name, brand: car.brand, price: car.price });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  return (
    <div className="car-management-container">
      <h2>Car Management</h2>

      <form className="car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Car Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price per day"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update Car" : "Add Car"}</button>
      </form>

      <table className="car-management-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price / Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>₹{car.price}</td>
              <td>
                <button onClick={() => handleEdit(car)} className="edit-btn">✏ Edit</button>
                <button onClick={() => handleDelete(car.id)} className="delete-btn">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarManagement;
