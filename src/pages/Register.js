import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // import Link
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");
      navigate("/login"); 
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit} autoComplete="off">
        <h2>Register</h2>
<input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  autoComplete="new-name"  
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  autoComplete="new-email"  
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  autoComplete="new-password" 
/>


        <button type="submit">Register</button>

      
        <p className="login-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
