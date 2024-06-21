import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/Signup'; 
import Footer from './pages/Footer/Footer';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import ProfilePage from './pages/Profile/ProfilePage/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfile/EditProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage/ChangePasswordPage';

const App = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/edit-profile" element={<EditProfilePage user={user} updateUser={updateUser} />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;