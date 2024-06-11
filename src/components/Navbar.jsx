import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <a href="/home">Home</a>
                <a href="/about">About Us</a>
                <a href="/services">Pages</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact </a>
            </div>
            <div className="navbar-links-right">
                <a href="https://instagram.com">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://facebook.com">
                    <FontAwesomeIcon icon={faFacebook} /> 
                </a>
                <a href="https://twitter.com">
                    <FontAwesomeIcon icon={faTwitter} /> 
                </a>
                <div className="request-quote">
                    <p>Request Quote</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;