import { X } from 'lucide-react';
import { EVENT_RULES } from '../data';
import './EventRulesModal.css';

interface EventRulesModalProps {
  isOpen: boolean;
  eventName: string | null;
  onClose: () => void;
  onRegisterClick?: () => void;
}

export const EventRulesModal = ({
  isOpen,
  eventName,
  onClose,
  onRegisterClick
}: EventRulesModalProps) => {
  if (!isOpen || !eventName) return null;

  const eventRules = EVENT_RULES[eventName];

  if (!eventRules) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{eventName}</h2>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body">
            <p>Rules for this event are not available yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{eventRules.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Rules Section */}
          <div className="rules-section">
            <h3>Event Rules</h3>
            <ul className="rules-list">
              {eventRules.rules.map((rule, index) => (
                <li key={index}>
                  <span className="rule-number">{index + 1}</span>
                  <span className="rule-text">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics Section (if applicable) */}
          {eventRules.topics && eventRules.topics.length > 0 && (
            <div className="topics-section">
              <h3>Suggested Topics</h3>
              <ul className="topics-list">
                {eventRules.topics.map((topic, index) => (
                  <li key={index}>
                    <span className="topic-icon">📋</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => {
            onClose();
            onRegisterClick?.();
          }}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRulesModal;
