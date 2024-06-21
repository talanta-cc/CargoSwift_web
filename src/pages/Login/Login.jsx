import React from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 

  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    let storedemail = localStorage.getItem("email");
    let storedpassword = localStorage.getItem("password");
    let storedusername = localStorage.getItem("username");

    if (storedemail === email && storedpassword === password) {
      localStorage.setItem("stored", 1);
      localStorage.setItem("user", JSON.stringify({ name: storedusername, email })); // store user data
      navigate("/profile");
    } else {
      alert("Invalid login credentials");
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
