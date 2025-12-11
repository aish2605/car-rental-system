import React, { useState, useEffect } from "react";
import "./CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);

  // Dummy Data temporarily (we will replace with API)
  useEffect(() => {
    const dummyCars = [
      { id: 1, name: "Honda City", brand: "Honda", price: 2500 },
      { id: 2, name: "Hyundai Creta", brand: "Hyundai", price: 3500 },
      { id: 3, name: "Maruti Swift", brand: "Maruti", price: 2000 }
    ];
    setCars(dummyCars);
  }, []);

  const handleEdit = (id) => {
    alert("Edit Car ID: " + id);
    // later redirect to edit page
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const handleAddCar = () => {
    window.location.href = "/admin/add-car";
  };

  return (
    <div className="carlist-container">
      <h2>Manage Cars</h2>
      <button className="add-btn" onClick={handleAddCar}>
        ➕ Add New Car
      </button>

      <table className="car-table">
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
                <button className="edit-btn" onClick={() => handleEdit(car.id)}>✏ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(car.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CarList;
