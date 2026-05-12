import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email);
    alert("Account created successfully!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, marginBottom: 10 }}
        />

        <button type="submit" style={{ padding: 10 }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;