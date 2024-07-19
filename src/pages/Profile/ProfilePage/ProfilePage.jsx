import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import VehicleForm from '../../../components/VehicleForm';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImage: '',
    username: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    about: '',
    role: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Stored user:', parsedUser); // Debug statement
      setUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prevState) => ({
        ...prevState,
        profileImage: reader.result,
      }));
      const updatedUser = { ...user, profileImage: reader.result };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('Changes saved successfully!');
  };

  const handleAddVehicle = (vehicle) => {
    console.log('Vehicle added:', vehicle);
  };

  return (
    <div className="profile-page">
      <h1>Personal Information</h1><hr />
      <div className="profile-container">
        <div className="profile-image">
          <img src={user.profileImage || 'default-avatar.png'} alt="Profile" />
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> <input type="text" name="name" value={user.name} onChange={handleInputChange} /></p>
          <p><strong>Username:</strong> <input type="text" name="username" value={user.username} onChange={handleInputChange} /></p>
          <p><strong>Email: </strong><input type="email" name="email" value={user.email} onChange={handleInputChange} /> </p>
          <p><strong>Phone Number:</strong> <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} /></p>
          <p><strong>Address:</strong> <input type="text" name="address" value={user.address} onChange={handleInputChange} /></p>
          <p><strong>Date of Birth:</strong> <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleInputChange} /></p>
          <p><strong>About:</strong> <textarea name="about" value={user.about} onChange={handleInputChange}></textarea></p>
        </div>
      </div><hr />
      <div className="profile-actions">
        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
        <Link to="/change-password" className="profile-action">Change Password</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {user.role === 'trucker' && (
        <div className="vehicle-form">
          <VehicleForm onAddVehicle={handleAddVehicle} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
