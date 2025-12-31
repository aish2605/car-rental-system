import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminCars = () => {
  const [cars, setCars] = useState([]);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    price_per_day: "",
    imageUrl: ""
  });

  const [editingId, setEditingId] = useState(null);

  // 🔹 LOAD ALL CARS
  const loadCars = async () => {
    try {
      const res = await api.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log("Error loading cars", err);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // 🔹 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 ADD OR UPDATE CAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        await api.put(`/cars/update/${editingId}`, form);
      } else {
        // ADD
        await api.post("/cars/add", form);
      }

      setForm({
        brand: "",
        model: "",
        price_per_day: "",
        imageUrl: ""
      });
      setEditingId(null);
      loadCars();
    } catch (err) {
      alert("Operation failed");
    }
  };

  // 🔹 EDIT BUTTON
  const handleEdit = (car) => {
    setForm({
      brand: car.brand,
      model: car.model,
      price_per_day: car.price_per_day,
      imageUrl: car.imageUrl || ""
    });
    setEditingId(car.id);
  };

  // 🔹 DELETE BUTTON
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await api.delete(`/cars/delete/${id}`);
      loadCars();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – Manage Cars</h2>

      {/* 🔹 ADD / UPDATE FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price_per_day"
          placeholder="Price per day"
          value={form.price_per_day}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Car" : "Add Car"}
        </button>
      </form>

      <hr />

      {/* 🔹 CAR LIST */}
      {cars.length === 0 && <p>No cars found</p>}

      {cars.map((car) => (
        <div
          key={car.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}
        >
          {/* IMAGE */}
          {car.imageUrl && (
            <img
              src={car.imageUrl}
              alt={car.brand}
              width="150"
            />
          )}

          {/* DETAILS */}
          <div>
            <p><b>{car.brand}</b> {car.model}</p>
            <p>₹{car.price_per_day} / day</p>

            <button onClick={() => handleEdit(car)}>Edit</button>
            <button
              onClick={() => handleDelete(car.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCars;
