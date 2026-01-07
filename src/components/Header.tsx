// Header Navigation Component
// Displays logo, college name, and navigation links

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onRegisterClick: () => void;
}

export const Header = ({ onRegisterClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Coordinators', href: '#coordinators' },
    { label: 'Register', href: '#register', className: 'nav-register' }
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* Logo / Branding */}
          <div className="navbar-brand">
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="logo-text">
                <div className="logo-main">TECH BLITZ</div>
                <div className="logo-sub">2K26</div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${link.className || ''}`}
                onClick={(e) => {
                  if (link.label === 'Register') {
                    e.preventDefault();
                    onRegisterClick();
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="nav-links-mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link-mobile ${link.className || ''}`}
                onClick={(e) => {
                  if (link.label === 'Register') {
                    e.preventDefault();
                    onRegisterClick();
                  }
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
