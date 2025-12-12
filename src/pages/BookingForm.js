import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import axiosInstance from "../api/axiosConfig"; // Assumed to be your authenticated Axios instance
import "./BookingForm.css";

const BookingForm = () => { // Removed { car } prop, now we fetch car details
    const navigate = useNavigate();
    const { carId } = useParams(); // Get car ID from the URL: /user/book/:carId
    
    // State to hold fetched car details
    const [carDetails, setCarDetails] = useState(null); 
    
    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        notes: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // --- Fetch Car Details on Load (Optional but Recommended) ---
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch details of the car the user clicked on 
                const res = await axiosInstance.get(`/cars/public/${carId}`); 
                setCarDetails(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setMessage("Could not load car details.");
                setLoading(false);
            }
        };
        fetchDetails();
    }, [carId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { // Make handleSubmit asynchronous
        e.preventDefault();
        setMessage("");

        if (!form.startDate || !form.endDate) {
            setMessage("Start date and End date are required");
            return;
        }

        try {
            // Data to send to the Spring Boot Backend
            const bookingData = {
                carId: parseInt(carId), // Use the ID from the URL
                startDate: form.startDate,
                endDate: form.endDate,
                // The backend (Spring Boot) will get the userId from the JWT token!
            };

            // 🛑 CRITICAL STEP: Send data to Spring Boot
            await axiosInstance.post("/api/bookings", bookingData); 
            
            setMessage("Booking Successful! Your booking is confirmed.");
            
            // Clear form and navigate to My Bookings
            setTimeout(() => navigate("/user/bookings"), 1500);

        } catch (error) {
            console.error("Booking submission error:", error.response || error);
            // Handle 400 (Validation) or 409 (Conflict/Car Unavailable) errors
            setMessage("Booking Failed. Check dates or try again.");
        }
    };

    if (loading) return <div className="booking-loading">Loading Car Data...</div>;

    return (
        <div className="booking-container">
            <h2>Book Car: {carDetails?.name || 'N/A'}</h2> 
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <label>Start Date:</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />

                <label>End Date:</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />

                <label>Notes (Optional):</label>
                <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>

                <button type="submit">Confirm & Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;