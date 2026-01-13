import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminCars.css";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    price_per_day: "",
    imageUrl: ""
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/cars/update/${editingId}`, form);
      } else {
        await api.post("/cars/add", form);
      }
      setForm({ brand: "", model: "", price_per_day: "", imageUrl: "" });
      setEditingId(null);
      loadCars();
    } catch {
      alert("Operation failed");
    }
  };

  const handleEdit = (car) => {
    setForm({
      brand: car.brand,
      model: car.model,
      price_per_day: car.price_per_day,
      imageUrl: car.imageUrl || ""
    });
    setEditingId(car.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    await api.delete(`/cars/delete/${id}`);
    loadCars();
  };

  return (
    <div className="admin-cars">
      <h2 className="title">🚗 Managing Cars 🚗</h2>

      
      <form className="car-form" onSubmit={handleSubmit}>
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
        <input type="number" name="price_per_day" placeholder="Price per day" value={form.price_per_day} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />

        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" className="preview-img" />
        )}

        <button type="submit" className="btn primary">
          {editingId ? "Update Car" : "Add Car"}
        </button>
      </form>

    
      <div className="car-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            {car.imageUrl && (
              <img src={car.imageUrl} alt={car.brand} className="car-img" />
            )}

            <h3>{car.brand} {car.model}</h3>
            <p>₹{car.price_per_day} / day</p>

            <div className="actions">
              <button onClick={() => handleEdit(car)} className="btn edit">Edit</button>
              <button onClick={() => handleDelete(car.id)} className="btn delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCars;
