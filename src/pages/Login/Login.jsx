import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); 

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('https://cargoswift.talantacomputerschool.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "An error occurred. Please try again.");
      } else {
        // alert("Login successful!");
        localStorage.setItem('token', result.data.token); 

        localStorage.setItem('user', JSON.stringify(result.data));
         // Call the onLogin callback
        const from = location.state?.from?.pathname || '/';
        
        if(result.error){
          alert(result.message || "An error occurred. Please try again.");
          return;
        }
        onLogin(result.data);
        navigate(from);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="Login">
      {isLoading && <LoadingIndicator />}
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
        <p>Forgot your password?</p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
