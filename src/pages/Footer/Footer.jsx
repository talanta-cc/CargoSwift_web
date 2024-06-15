import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="contact">
                <div className="info opening-hours">
                    <div className="icon-wrapper"><i className="fa-regular fa-clock"></i></div>
                    <div className="info-details">
                        <p>Mon-Sat 9:00-18:00</p>
                        <p>Sunday Closed</p>
                    </div>
                </div>
                <div className="email info">
                    <div className="icon-wrapper"><i className="fa-regular fa-envelope"></i></div>
                    <div className="info-details">
                        <p>Email</p>
                        <p>contact@transitflow.com</p>
                    </div>
                </div>
                <div className="phone info">
                    <div className="icon-wrapper">
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="info-details">
                        <p>Call Us</p>
                        <p>(00)122 456 789</p>
                    </div>
                </div>
            </div>
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
        </div>
    );
};

export default Footer;
