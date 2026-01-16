// Coordinators Section Component
// Displays contact information for department coordinators

import { useState, useEffect } from 'react';
import { getAllDepartmentsFromFirestore } from '../firestoreEventDataUtils';
import type { DepartmentInfo } from '../firestoreEventDataUtils';
import { Phone, User, GraduationCap, Loader, AlertCircle } from 'lucide-react';
import './Coordinators.css';

export const Coordinators = () => {
  const [departments, setDepartments] = useState<DepartmentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCoordinators();
  }, []);

  const loadCoordinators = async () => {
    try {
      setLoading(true);
      const data = await getAllDepartmentsFromFirestore();
      setDepartments(data);
    } catch (err) {
      setError(`Failed to load coordinators: ${err instanceof Error ? err.message : String(err)}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="coordinators" className="coordinators-section">
        <div className="container">
          <div className="loading-center">
            <Loader size={40} className="animate-spin" />
            <p>Loading coordinators...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="coordinators" className="coordinators-section">
        <div className="container">
          <div className="error-message">
            <AlertCircle size={24} />
            <p>Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          {departments.map((dept) => (
            <div key={dept.id} className="coordinator-card">
              <div className="coord-header">
                <h3 className="coord-dept">{dept.name}</h3>
              </div>

              <div className="coord-body">
                {/* Staff Coordinator */}
                <div className="coordinator-group">
                  <p className="coord-role">Faculty Coordinator</p>
                  {dept.staff && dept.staff.map((staff) => (
                    <div key={staff.id} className="coordinator-item">
                      <div className="coordinator-avatar">
                        <User size={20} />
                      </div>
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
                  {dept.students && dept.students.map((student) => (
                    <div key={student.id} className="coordinator-item">
                      <div className="coordinator-avatar">
                        <GraduationCap size={20} />
                      </div>
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

        
      </div>
    </section>
  );
};

export default Coordinators;