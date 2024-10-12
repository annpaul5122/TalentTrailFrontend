import React, { useEffect, useState } from "react";
import "../styles/signup/ResetPassword.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpwd, setConfirm]= useState("");
  const [token, setToken] = useState(null);
  
  const location = useLocation();
  useEffect(() => {
  
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token"); 
    setToken(tokenParam); 
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmpwd) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmpwd) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Token is missing");
      return;
    }

    try {
      const res = await axios.post(
        "https://localhost:7119/api/Users/reset-password",
        {
            token: token,
            newPassword: password,
            confirmPassword: confirmpwd
        }
      );
      if(res.status===200)
      {
        alert("Reset successful. Close this tab and continue.")
      }
    } catch (error) {
      alert("Error resetting password. Please try again.");
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
          <label htmlFor="confirmpwd">Confirm Password</label>
          <input
            type="password"
            id="confirmpwd"
            value={confirmpwd}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" className="submit-button" style={{backgroundColor:"#0A3D64"}}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
