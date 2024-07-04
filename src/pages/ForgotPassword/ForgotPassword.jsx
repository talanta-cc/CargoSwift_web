import React from 'react';
import './ForgotPassword.css'; 
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch('https://cargoswift.talantacomputerschool.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "An error occurred. Please try again.");
      } else {
        alert("Password reset link has been sent to your email.");
        navigate("/login");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <button type="submit" className="reset_btn">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
