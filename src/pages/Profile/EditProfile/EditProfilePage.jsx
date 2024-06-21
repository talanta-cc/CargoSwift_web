import React, { useState, useEffect } from 'react';
import './EditProfilePage.css';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setName(storedUser.name);
      setEmail(storedUser.email);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/profile'); 
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfilePage;