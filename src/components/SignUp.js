import React, { useState } from "react";
import axios from "axios";
import "./home.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gpabackend.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      alert(response.data.message); // Display success message
      setEmail("");
      setName("");
      setPassword("");
    } catch (error) {
      alert("Signup failed. " + error.response.data.error);
    }
  };

  return (
    <div className="signUpPage">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
