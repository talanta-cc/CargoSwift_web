import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'; 
import SignUp from './pages/SignUp/Signup';
import Footer from './pages/Footer/Footer';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import ProfilePage from './pages/Profile/ProfilePage/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfile/EditProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage/ChangePasswordPage';
import OrderList from './pages/Orders/OrderList';
import TrucksPage from './pages/Trucks/TrucksPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trucks" element={<TrucksPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={ProfilePage} user={user} />}
        />
        <Route
          path="/edit-profile"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EditProfilePage} updateUser={updateUser} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={ChangePasswordPage} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={OrderList} user={user} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
