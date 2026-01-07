// Events Display Component
// Shows all technical events organized by department

import { TECHNICAL_EVENTS, DEPARTMENTS_INFO, PAPER_PRESENTATION_TOPICS } from '../data';
import type { Department } from '../types';
import './Events.css';
import { ChevronRight } from 'lucide-react';

interface EventsProps {
  onEventSelect: (eventName: string, department: Department) => void;
}

export const Events = ({ onEventSelect }: EventsProps) => {
  // Group technical events by department
  const eventsByDepartment = TECHNICAL_EVENTS.reduce(
    (acc, event) => {
      if (!acc[event.department]) {
        acc[event.department] = [];
      }
      acc[event.department].push(event);
      return acc;
    },
    {} as Record<Department, typeof TECHNICAL_EVENTS>
  );

  const departments = DEPARTMENTS_INFO;

  return (
    <section id="events" className="events-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Events & Competitions</h2>
          <p className="section-subtitle">
            Explore exciting technical and non-technical events across all departments
          </p>
        </div>

        {/* Events by Department */}
        <div className="departments-grid">
          {departments.map((dept) => (
            <div key={dept.id} className="department-card">
              <div className="dept-header">
                <h3 className="dept-name">{dept.name}</h3>
                <div className="dept-icon">🏢</div>
              </div>

              {/* Technical Events */}
              <div className="events-list">
                {eventsByDepartment[dept.id] && eventsByDepartment[dept.id].length > 0 ? (
                  <>
                    <div className="events-category">
                      <p className="category-label">Technical Events</p>
                      {eventsByDepartment[dept.id].map((event) => (
                        <button
                          key={event.id}
                          className="event-item"
                          onClick={() => onEventSelect(event.name, event.department)}
                        >
                          <span className="event-name">{event.name}</span>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Paper Presentation Topics */}
                <div className="events-category">
                  <p className="category-label">Paper Presentation Topics</p>
                  <div className="papers-list">
                    {PAPER_PRESENTATION_TOPICS[dept.id].map((topic, idx) => (
                      <button
                        key={idx}
                        className="paper-item"
                        onClick={() => onEventSelect(`Paper Presentation: ${topic}`, dept.id)}
                      >
                        <span className="paper-icon">📄</span>
                        <span className="paper-topic">{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Technical Events */}
        <div className="non-technical-section">
          <h3 className="non-tech-title">Non-Technical Events</h3>
          <div className="non-tech-events">
            <div className="event-card">
              <div className="event-card-icon">🎵</div>
              <h4>RHYTHMICA</h4>
              <p>Cultural and musical performances - Open to all departments</p>
              <button
                className="btn btn-primary btn-small"
                onClick={() => onEventSelect('RHYTHMICA', 'auto_mech')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
