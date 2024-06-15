import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './pages/Home/Home';
import About from './pages/AboutUs/About';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/Signup'; 
import Footer from './pages/Footer/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
