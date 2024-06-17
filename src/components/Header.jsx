import React from 'react';
import './Header.css';

function Header() {
  return (
    <>
      <div className="contact-wrapper">
        <div className="logo">
          <i className="fa-solid fa-thin fa-cubes"></i>
          <p>CargoSwift</p>
        </div>
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
            <div className="icon-wrapper"><i className="fa-solid fa-phone"></i></div>
            <div className="info-details">
              <p>Call Us</p>
              <p>(00)122 456 789</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
