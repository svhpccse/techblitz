// Events Display Component
// Shows all technical events organized by department

import { useState, useEffect } from 'react';
import { getAllEventsFromFirestore, getAllPaperTopicsFromFirestore, getAllDepartmentsFromFirestore } from '../firestoreEventDataUtils';
import type { TechEvent as DataTechEvent } from '../firestoreEventDataUtils';
import type { Department } from '../types';
import './Events.css';
import { ChevronRight, Loader } from 'lucide-react';

// ============================================
// HARDCODED EVENT RULES
// ============================================


interface EventsProps {
  onEventSelect: (eventName: string, department: Department, rules?: { title: string; rules: string[] }) => void;
}

export const Events = ({ onEventSelect }: EventsProps) => {
  const [events, setEvents] = useState<DataTechEvent[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [paperTopics, setPaperTopics] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [eventsData, deptData, topicsData] = await Promise.all([
        getAllEventsFromFirestore(),
        getAllDepartmentsFromFirestore(),
        getAllPaperTopicsFromFirestore()
      ]);
      setEvents(eventsData);
      setDepartments(deptData);
      setPaperTopics(topicsData);
    } catch (err) {
      setError(`Failed to load events: ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group technical events by department
  const eventsByDepartment = events
    .filter(e => e.type === 'technical' || e.type === 'non_technical')
    .reduce(
      (acc, event) => {
        if (!acc[event.department]) {
          acc[event.department] = [];
        }
        acc[event.department].push(event);
        return acc;
      },
      {} as Record<string, DataTechEvent[]>
    );

  if (loading) {
    return (
      <section id="events" className="evt-section">
        <div className="evt-wrapper">
          <div className="evt-loading-center">
            <Loader size={40} className="animate-spin" />
            <p>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="evt-section">
        <div className="evt-wrapper">
          <div className="evt-error-message">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="evt-section">
      <div className="evt-wrapper">
        {/* Section Header */}
        <div className="evt-header">
          <h2 className="evt-title">Events & Competitions</h2>
          <p className="evt-subtitle">
            Explore exciting technical and non-technical events across all departments
          </p>
        </div>

        {/* Events by Department */}
        <div className="evt-departments-grid">
          {departments.map((dept) => (
            <div key={dept.id} className="evt-dept-card">
              <div className="evt-dept-header">
                <h3 className="evt-dept-name">{dept.name}</h3>
                <div className="evt-dept-icon">🏢</div>
              </div>

              {/* Technical Events */}
              <div className="evt-events-list">
                {eventsByDepartment[dept.id] && eventsByDepartment[dept.id].length > 0 ? (
                  <>
                    <div className="evt-category">
                      <p className="evt-category-label">Technical Events</p>
                      {eventsByDepartment[dept.id].map((event) => (
                        <button
                          key={event.id}
                          className="evt-event-btn"
                          onClick={() => onEventSelect(event.name, event.department as Department)}
                        >
                          <span className="evt-event-name">{event.name}</span>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Paper Presentation Topics */}
                <div className="evt-category">
                  <p className="evt-category-label">Paper Presentation Topics</p>
                  <div className="evt-papers-list">
                    {paperTopics[dept.id] && paperTopics[dept.id].map((topic, idx) => (
                      <button
                        key={idx}
                        className="evt-paper-btn"
                        onClick={() => onEventSelect(`Paper Presentation: ${topic}`, dept.id as Department)}
                      >
                        <span className="evt-paper-icon">📄</span>
                        <span className="evt-paper-topic">{topic}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Technical Events */}
        <div className="evt-nontech-section">
          <h3 className="evt-nontech-title">Non-Technical Events</h3>
          <div className="evt-nontech-grid">
            {events
              .filter(e => e.type === 'non_technical')
              .map((event) => (
                <div key={event.id} className="evt-card">
                  <div className="evt-card-icon">🎵</div>
                  <h4>{event.name}</h4>
                  <p>{event.description}</p>
                  <button
                    className="evt-btn evt-btn-primary evt-btn-small"
                    onClick={() => onEventSelect(event.name, event.department as Department)}
                  >
                    Register
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
