// Coordinators Section Component
// Displays contact information for department coordinators

import { DEPARTMENTS_INFO } from '../data';
import { Phone } from 'lucide-react';
import './Coordinators.css';

export const Coordinators = () => {
  return (
    <section id="coordinators" className="coordinators-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Event Coordinators</h2>
          <p className="section-subtitle">
            Connect with department coordinators for more information
          </p>
        </div>

        {/* Coordinators Grid */}
        <div className="coordinators-grid">
          {DEPARTMENTS_INFO.map((dept) => (
            <div key={dept.id} className="coordinator-card">
              <div className="coord-header">
                <h3 className="coord-dept">{dept.name}</h3>
              </div>

              <div className="coord-body">
                {/* Staff Coordinator */}
                <div className="coordinator-group">
                  <p className="coord-role">Faculty Coordinator</p>
                  {dept.staff.map((staff) => (
                    <div key={staff.name} className="coordinator-item">
                      <div className="coordinator-avatar">👨‍🏫</div>
                      <div className="coordinator-info">
                        <p className="coordinator-name">{staff.name}</p>
                        <a href={`tel:${staff.phone}`} className="coordinator-contact">
                          <Phone size={14} />
                          <span>{staff.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Student Coordinators */}
                <div className="coordinator-group">
                  <p className="coord-role">Student Coordinators</p>
                  {dept.students.map((student) => (
                    <div key={student.name} className="coordinator-item">
                      <div className="coordinator-avatar">👤</div>
                      <div className="coordinator-info">
                        <p className="coordinator-name">{student.name}</p>
                        <a href={`tel:${student.phone}`} className="coordinator-contact">
                          <Phone size={14} />
                          <span>{student.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QR Code Section */}
        <div className="qr-section">
          <h3>Quick Registration</h3>
          <p>Scan the QR code to register or visit our website</p>
          <div className="qr-placeholder">
            <div className="qr-icon">📱</div>
            <p>QR Code for Registration</p>
            <p className="qr-subtitle">www.svhpc.in</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coordinators;
