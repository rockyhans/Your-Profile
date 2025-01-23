import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post(
        "https://gpabackend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token; // Get token from response
      localStorage.setItem("token", token); // Save token to localStorage

      alert("Login successful!");
      setEmail("");
      setPassword("");

      // Navigate to the SGPA page after login
      navigate("/userdata"); // Redirect to /sgpa route
    } catch (error) {
      // Handle errors during login
      setError(
        "Login failed: " + (error.response?.data?.error || error.message),
        alert("Login failed")
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="CGPAinput"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="CGPAinput"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginForm;
