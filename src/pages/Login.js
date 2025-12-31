import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
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

      // save token + role
      login(res.data.token, res.data.role);
localStorage.setItem("userId", res.data.userId);
navigate("/dashboard");
      // ✅ USER → dashboard
      if (res.data.role === "USER" || res.data.role === "ROLE_USER") {
        navigate("/dashboard");
      }
      // ✅ ADMIN → admin dashboard (future use)
      else if (res.data.role === "ADMIN" || res.data.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
      else {
        navigate("/unauthorized");
      }

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
           autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
           autoComplete="off"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
