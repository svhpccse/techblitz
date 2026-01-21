// Hero Section Component
// Welcome banner with event title and key information

import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { getEventDetailsFromFirestore } from "../firestoreEventDataUtils";
import type { EventDetail } from "../firestoreEventDataUtils";
import "./Hero.css";

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero = ({ onRegisterClick }: HeroProps) => {
  const [eventDetails, setEventDetails] = useState<EventDetail | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    loadEventDetails();
  }, []);

  const loadEventDetails = async () => {
    try {
      const details = await getEventDetailsFromFirestore();
      setEventDetails(
        details || {
          college: "SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE",
          location: "Gobichettipalayam, Erode – 638 455",
          eventName: "TECH BLITZ 2K26",
          tagline: "A State Level Technical Symposium",
          eventDate: "30 January",
          registrationFee: "₹150",
          registrationDeadline: "27.01.2026",
          intimationDate: "28.01.2026",
          prizeWorth: "3 Lakhs",
          website: "www.svhpc.in",
          spotRegistration: true,
        }
      );
    } catch (err) {
      console.error("Error loading event details:", err);
      // Set default values on error
      setEventDetails({
        college: "SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE",
        location: "Gobichettipalayam, Erode – 638 455",
        eventName: "TECH BLITZ 2K26",
        tagline: "A State Level Technical Symposium",
        eventDate: "30 January",
        registrationFee: "₹150",
        registrationDeadline: "27.01.2026",
        intimationDate: "28.01.2026",
        prizeWorth: "3 Lakhs",
        website: "www.svhpc.in",
        spotRegistration: true,
      });
    } finally {
      setLoading(false);
    }
  };
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
            {/* Header Logo */}
            <div className="hero-header-logos">
              <img
                src="/logos/co-c.png"
                alt="coc Logo"
                className="header-logo"
              />
              <img
                src="/logos/logo.png"
                alt="SVHPC Logo"
                className="header-logo"
              />
              <img
                src="/logos/sow.png"
                alt="Sow Logo"
                className="header-logo"
              />
            </div>
            <p className="college-name">
              {eventDetails?.college ||
                "SHREE VENKATESHWARA HI-TECH POLYTECHNIC COLLEGE"}
            </p>
            <p className="college-location">
              {eventDetails?.location || "Gobichettipalayam, Erode – 638 455"}
            </p>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            <span className="title-accent">TECH</span> BLITZ{" "}
            <span className="title-accent">2K26</span>
          </h1>

          {/* Event Type & Details */}
          <div className="hero-tagline">
            <p className="event-type">
              {eventDetails?.tagline || "A State Level Technical Symposium"}
            </p>
            {eventDetails && (
              <div className="hero-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{eventDetails.eventDate}</span>
                </div>
                <div className="detail-divider"></div>
                <div className="detail-item">
                  <span className="detail-label">Fee:</span>
                  <span className="detail-value">
                    {eventDetails.registrationFee}/head
                  </span>
                </div>
                <div className="detail-divider"></div>
                <div className="detail-item">
                  <span className="detail-label">Prize:</span>
                  <span className="detail-value">
                    {eventDetails.prizeWorth} Awaits
                  </span>
                </div>
              </div>
            )}
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
              ✓ Spot Registration Available (Except Paper Presentation)
            </div>
          </div>

          {/* Department Logos */}
          <div className="hero-logos">
            <h3 className="logos-title">Departments</h3>
            <div className="logos-grid">
              <div className="logo-item">
                <img
                  src="/logos/cse.png"
                  alt="Computer Science Engineering"
                  title="CSE"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/ece.png"
                  alt="Electronics and Communication Engineering"
                  title="ECE"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/eee.png"
                  alt="Electrical and Electronics Engineering"
                  title="EEE"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/mech.jpeg"
                  alt="Mechanical Engineering"
                  title="MECH"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/civil.jpeg"
                  alt="Civil Engineering"
                  title="CIVIL"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/auto.jpeg"
                  alt="Automobile Engineering"
                  title="AUTO"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/aiml.jpeg"
                  alt="AI and Machine Learning"
                  title="AI/ML"
                />
              </div>
              <div className="logo-item">
                <img
                  src="/logos/mlt.png"
                  alt="Medical Laboratory Technology"
                  title="MLT"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
