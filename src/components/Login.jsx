import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", { email, password });
      saveToken(response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="form-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
