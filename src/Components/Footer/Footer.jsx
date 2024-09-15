import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/M.png';
import high_opacity_logo from '../Assets/logo_big1.png';
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import facebook_icon from '../Assets/facebook_icon.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className="footer-card footer-logo-card">
          <div className="footer-logo">
          <a href="/"><img src={footer_logo} alt='Shopper' className="low-opacity-logo" /></a>
            {/* <img src={high_opacity_logo} alt='Shopper' className="high-opacity-logo" /> */}
          </div>
        </div>
        
        <div className="footer-card footer-links-card">
          <ul className='footer-links'>
            <h3>Quick Links</h3>
            <li><a href="/">Home</a></li>
            <li><a href="/t-shirt">T-Shirts</a></li>
            <li><a href="/other-items">Other Items</a></li>
            <li><a href="/others">Others</a></li>
            <li><a href="/contact Us">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-card footer-newsletter-card">
          <h3>Sign up for Moramerc Newsletter</h3>
          <form onSubmit={handleFormSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="signup-button">Submit</button>
          </form>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61560774282709&mibextid=LQQJ4d"><img src={facebook_icon} alt='Facebook' /></a>
            <a href="https://www.instagram.com/moramerc_?igsh=dHFrZG9wdGQ0ajhv"><img src={instagram_icon} alt='Instagram' /></a>
            <a href="https://wa.me/+94775963961"><img src={whatsapp_icon} alt='WhatsApp' /></a>
          </div>
        </div>
      </div>
      <div className="footer-mobile">
        <div className="footer-mobile-layout">
          <div className="footer-mobile-card footer-mobile-logo-card">
            <div className="footer-logo">
            <a href="/"><img src={footer_logo} alt='Shopper' className="low-opacity-logo" /></a>
              {/* <img src={high_opacity_logo} alt='Shopper' className="high-opacity-logo" /> */}
            </div>
          </div>
          <div className="footer-mobile-card footer-mobile-links-card">
            <ul className='footer-links'>
              <h3>Quick Links</h3>
              <li><a href="/">Home</a></li>
              <li><a href="/t-shirt">T-Shirts</a></li>
              <li><a href="/other-items">Other Items</a></li>
              <li><a href="/others">Others</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-mobile-newsletter-card">
          <h3>Sign up for Moramerc Newsletter</h3>
          <form onSubmit={handleFormSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              className="newsletter-input"
            />
            <button type="submit" className="signup-button">Submit</button>
          </form>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=61560774282709&mibextid=LQQJ4d"><img src={facebook_icon} alt='Facebook' /></a>
            <a href="https://www.instagram.com/moramerc_?igsh=dHFrZG9wdGQ0ajhv"><img src={instagram_icon} alt='Instagram' /></a>
            <a href="https://wa.me/+94775963961"><img src={whatsapp_icon} alt='WhatsApp' /></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright @ 2024 MoraMerc - All Right Reserved</p>
        <p>Concept, Design, Development & Powered by BISON Corps.</p>
      </div>
    </div>
  );
}

export default Footer;
