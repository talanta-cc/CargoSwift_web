import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log('User logged out');
        // Redirect to home or login page after logout
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="hamburger-menu" onClick={handleMenuToggle}>
                {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </div>
            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <Link to="/">Home</Link>
                <div className="dropdown">
                    <Link to="#" className="dropdown-link">Trucks</Link>
                    <div className="dropdown-content">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About Us</Link>
            </div>
            <div className="navbar-links-right">
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button> 
                <div className="social-media">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
                <div className="request-quote">
                    <p>Request Quote</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;