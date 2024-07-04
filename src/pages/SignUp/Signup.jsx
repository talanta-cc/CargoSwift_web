import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [details, setDetails] = useState({
    username: "",
    email: "",
    phone_number: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const { username, email, phone_number, role, password, confirmPassword } = details;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false); 
      return;
    }

    try {
      const response = await fetch('https://cargoswift.talantacomputerschool.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          phone_number,
          role,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "An error occurred. Please try again.");
      } else {
        setSuccess("Registration Successful!");
        setError(null);
        navigate('/login'); 
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {isLoading && <LoadingIndicator />}
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
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={details.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={details.role} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="trucker">Trucker</option>
          </select>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default Signup;
