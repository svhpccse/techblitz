// Footer Component
// Displays footer information and social links

import { Mail, MapPin, Globe } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Content Grid */}
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h4>TECH BLITZ 2K26</h4>
            <p>
              A state-level technical symposium hosted by Shree Venkateshwara Hi-Tech Polytechnic
              College, featuring competitions, paper presentations, and networking opportunities for
              students across all departments.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-items">
             
              <a href="svhpc.in" className="contact-item">
                <Mail size={16} />
                <span>svhpc.in</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Gobichettipalayam, Erode 638 455</span>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#coordinators">Coordinators</a>
              </li>
              <li>
                <a href="https://www.svhpc.in" target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="footer-section">
            <h4>Event Info</h4>
            <ul className="footer-links">
              <li>
                <span>Date: 30 January 2026</span>
              </li>
              <li>
                <span>Registration Fee: ₹150</span>
              </li>
              <li>
                <span>Prize Worth: 3 Lakhs</span>
              </li>
              <li>
                <span>Closes: 27.01.2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-text">
            &copy; {currentYear} TECH BLITZ 2K26. All rights reserved. Hosted by Shree Venkateshwara
            Hi-Tech Polytechnic College
          </p>
          <div className="footer-socials">
            <a href="https://www.svhpc.in" target="_blank" rel="noopener noreferrer" title="Website">
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
