import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/M logo white.png';
import facebook_logo from '../Assets/facebook.png';
import instagram_logo from '../Assets/instagram.png';
import linkedin_logo from '../Assets/linkedin.png';
import whatsapp_logo from '../Assets/whatsapp.png';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={footer_logo} alt="Moramerc Logo" className="footer-logo" />
          <p className="brand-tagline"><h3>Wear Your Spirit</h3></p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/t-shirts">T-Shirts</a></li>
            <li><a href="/other-items">Other Items</a></li>
            <li><a href="/combo-packs">Combo Packs</a></li>
            <li><a href="/contacts">Contacts</a></li>
          </ul>
        </div>

        <div className="footer-help">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="/account">My Account</a></li>
            <li><a href="/orders">My Orders</a></li>
            <li><a href="/terms">Term of Use</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Sign Up for Moramerc Newletter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit"><h4>Subscribe</h4></button>
          </form>
          <div className="social-links" >
            <a href="https://facebook.com" aria-label="Facebook"><img src={facebook_logo} alt="Facebook Logo" className="Facebook-logo" /></a>
            <a href="https://instagram.com" aria-label="Instagram"><img src={instagram_logo} alt="Instagram Logo" className="Instagram-logo"/></a>
            <a href="https://wa.me/+94775963961" aria-label="WhatsApp"><img src={whatsapp_logo} alt="Whatsapp Logo" className="Whatsapp-logo"/></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><img src={linkedin_logo} alt="Linkedin Logo" className="Linkedin-logo" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025, Moramerc. All rights reserved</p>
        <p>Concept, Design, Development & Powered by BISON Corps</p>
      </div>
    </footer>
  );
};

export default Footer;