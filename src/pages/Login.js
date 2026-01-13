import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom"; // import Link
import { useAuth } from "../auth/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      
      login(res.data.token, res.data.role);
      localStorage.setItem("userId", res.data.userId);

      
      if (res.data.role === "USER" || res.data.role === "ROLE_USER") {
        navigate("/user");
      }
     
      else if (res.data.role === "ADMIN" || res.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/unauthorized");
      }

    } catch (err) {
      setError("Invalid email or password");
    }
  };

 return (
  <div className="login-wrapper">
   
    <div className="login-image">
      <h1>Welcome Back 🚗</h1>
     
    </div>

   
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit} autoComplete="off">
        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

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

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default Login;
