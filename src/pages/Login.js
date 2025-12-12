import React, { useState, useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";
import "./Login.css";

const Login = () => {
    // 1. PLACE ALL HOOKS AT THE TOP LEVEL OF THE COMPONENT
    const { auth, setAuth } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // 2. USE useEffect FOR SAFE NAVIGATION AFTER AUTH STATE UPDATE
    useEffect(() => {
        // This runs whenever the 'auth' state changes (i.e., after successful login)
        if (auth.isLoggedIn && auth.role) {
            // Now that auth.role is definitely set in context, navigate safely
            if (auth.role === "ADMIN") {
                navigate("/admin");
            } else if (auth.role === "USER") {
                navigate("/user");
            }
        }
    }, [auth, navigate]); // Depend on 'auth' state and 'navigate' function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/login", form);

            // Save credentials to Local Storage (Step 1)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("role", res.data.role);

            // Update Context State (Step 2: This triggers the useEffect above)
            setAuth({ 
                isLoggedIn: true, 
                username: res.data.username, 
                role: res.data.role 
            });

            // DO NOT CALL navigate() HERE. useEffect handles the redirection.

        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
};

export default Login;