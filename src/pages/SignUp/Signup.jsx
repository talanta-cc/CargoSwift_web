import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    const [details, setDetails] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDetails({
        ...details,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const { username, email, password, confirmPassword } = details;
      console.log(details);
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      alert("Registration Successful!");
    };
  
    return (
      <div className="registration-container">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={details.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={details.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='signup_btn'>Register</button>
        </form>
      </div>
    );
}

export default Signup;