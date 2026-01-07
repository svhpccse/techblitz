// Admin Panel Component
import { useState, useEffect } from 'react';
import { Download, Loader, AlertCircle, Eye, EyeOff } from 'lucide-react';
import type { Registration } from '../types';
import { DEPARTMENTS } from '../types';
import { getAllRegistrations, exportToExcel, getRegistrationStats } from '../adminUtils';
import './Admin.css';

export const Admin = () => {
  const [registrations, setRegistrations] = useState<(Registration & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterEventType, setFilterEventType] = useState('');
  const [showImages, setShowImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      exportToExcel(registrations);
    } catch (err: any) {
      setError(err.message || 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      reg.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || reg.department === filterDepartment;
    const matchesEventType = !filterEventType || reg.eventType === filterEventType;

    return matchesSearch && matchesDepartment && matchesEventType;
  });

  const stats = getRegistrationStats(registrations);

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-state">
          <Loader size={48} className="animate-spin" />
          <p>Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel - TECH BLITZ 2K26</h1>
        <p>View and manage all registrations</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Registrations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats.byDepartment).length}</div>
          <div className="stat-label">Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.total * 150}</div>
          <div className="stat-label">Total Fee (₹)</div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="admin-controls">
        <div className="search-and-filters">
          <input
            type="text"
            placeholder="Search by name, email, phone, or event..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="filter-select"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {Object.entries(DEPARTMENTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterEventType}
            onChange={(e) => setFilterEventType(e.target.value)}
          >
            <option value="">All Event Types</option>
            <option value="technical">Technical</option>
            <option value="non_technical">Non-Technical</option>
            <option value="paper_presentation">Paper Presentation</option>
          </select>
        </div>

        <button
          className="btn-export"
          onClick={handleExport}
          disabled={exporting || registrations.length === 0}
        >
          {exporting ? (
            <>
              <Loader size={18} className="animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Export to Excel</span>
            </>
          )}
        </button>
      </div>

      {/* Results Count */}
      <div className="results-info">
        Showing {filteredRegistrations.length} of {registrations.length} registrations
      </div>

      {/* Registrations Table */}
      <div className="table-wrapper">
        {filteredRegistrations.length > 0 ? (
          <table className="registrations-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Department</th>
                <th>Year</th>
                <th>Event Type</th>
                <th>Event Name</th>
                <th>Payment Proof</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td className="name-cell">{reg.name}</td>
                  <td className="email-cell">{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.college}</td>
                  <td>
                    <span className="badge badge-dept">{DEPARTMENTS[reg.department]}</span>
                  </td>
                  <td>{reg.year}</td>
                  <td>
                    <span className="badge badge-event">{reg.eventType}</span>
                  </td>
                  <td className="event-name">{reg.eventName}</td>
                  <td className="payment-cell">
                    {reg.paymentScreenshot ? (
                      <div className="payment-preview">
                        <button
                          className="view-btn"
                          onClick={() => setShowImages({
                            ...showImages,
                            [reg.id]: !showImages[reg.id]
                          })}
                          title="Toggle payment proof"
                        >
                          {showImages[reg.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {showImages[reg.id] && (
                          <div className="image-modal">
                            <img src={reg.paymentScreenshot} alt="Payment proof" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="no-proof">No proof</span>
                    )}
                  </td>
                  <td className="date-cell">
                    {reg.timestamp
                      ? new Date(reg.timestamp).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No registrations found matching your filters</p>
          </div>
        )}
      </div>

      {/* Department Statistics */}
      <div className="stats-section">
        <h3>Statistics by Department</h3>
        <div className="stats-breakdown">
          {Object.entries(stats.byDepartment).map(([dept, count]) => (
            <div key={dept} className="stat-breakdown-item">
              <span>{DEPARTMENTS[dept as keyof typeof DEPARTMENTS]}</span>
              <span className="count-badge">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
