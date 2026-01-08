// Hero Section Component
// Welcome banner with event title and key information

import { ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { EVENT_DETAILS } from '../data';
import './Hero.css';

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero = ({ onRegisterClick }: HeroProps) => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* College Info */}
          <div className="hero-college">
            <p className="college-name">SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE</p>
            <p className="college-location">Gobichettipalayam, Erode – 638 455</p>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            <span className="title-accent">TECH</span> BLITZ <span className="title-accent">2K26</span>
          </h1>

          {/* Event Type & Details */}
          <div className="hero-tagline">
            <p className="event-type">A State Level Technical Symposium</p>
            <div className="hero-details">
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{EVENT_DETAILS.eventDate}</span>
              </div>
              <div className="detail-divider"></div>
              <div className="detail-item">
                <span className="detail-label">Fee:</span>
                <span className="detail-value">{EVENT_DETAILS.registrationFee}/head</span>
              </div>
              <div className="detail-divider"></div>
              <div className="detail-item">
                <span className="detail-label">Prize:</span>
                <span className="detail-value">{EVENT_DETAILS.prizeWorth} Awaits</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button className="btn btn-gold" onClick={onRegisterClick}>
              <span>Register Now</span>
              <ArrowRight size={20} />
            </button>
           
          </div>

          {/* Additional Info */}
          <div className="hero-info">
            <div className="info-badge">
              <span>✓</span> Spot Registration Available (Except Paper Presentation)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
