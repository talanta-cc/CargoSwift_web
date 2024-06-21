import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('stored');
    localStorage.removeItem('user');
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div>
        <Link to="/edit-profile">Edit Profile</Link>
      </div>
      <div>
        <Link to="/change-password">Change Password</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;

