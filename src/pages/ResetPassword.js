import React, { useEffect, useState } from "react";
import "../styles/signup/ResetPassword.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation(); // Access the current URL
  const [token, setToken] = useState(null); // State to hold the token value
  const nav = useNavigate();
  useEffect(() => {
    // Use URLSearchParams to get the token from the query string
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token"); // Get the 'token' query param
    setToken(tokenParam); // Store the token in state
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Please enter your new password");
      return;
    }

    // Simulating a POST request to reset the password
    try {
      const res = axios.post(
        "https://localhost:7119/api/Users/reset-password",
        {
            token,
            password
        }
      );
      setMessage("Password reset successful!");
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Reset Password
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
