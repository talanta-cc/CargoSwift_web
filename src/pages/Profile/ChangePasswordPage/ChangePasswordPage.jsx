import React, { useState } from 'react';
import './changePasswordPage.css';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedPassword = localStorage.getItem('password');

    if (storedPassword !== oldPassword) {
      setMessage('Old password is incorrect');
      return;
    }

    localStorage.setItem('password', newPassword);
    setMessage('Password changed successfully');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="change-password-page">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePasswordPage;