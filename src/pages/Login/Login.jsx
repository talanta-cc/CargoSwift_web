import React from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('https://cargoswift.talantacomputeschoo.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.error) {
        alert(result.message);
      } else {
        alert("Login successful!");
        localStorage.setItem('token', result.data.token); 
        localStorage.setItem('user', JSON.stringify({ name: result.data.name, email }));
        navigate("/profile");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="login_btn">Login</button>
        </form>
        <p>Don't have an account?</p>
        <Link to="/signup">Register</Link>
      </div>
    </div>
  );
};

export default Login;
