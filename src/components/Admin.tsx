// Admin Panel Component
import { useState, useEffect } from 'react';
import { 
  Download, 
  Loader, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  FileDown, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  Calendar, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  X,
  Settings
} from 'lucide-react';
import type { Registration } from '../types';
import { DEPARTMENTS } from '../types';
import { getAllRegistrations, exportToExcel, getRegistrationStats } from '../adminUtils';
import AdminRulesEditor from './AdminRulesEditor';
import AdminEventsEditor from './AdminEventsEditor';
import AdminCoordinatorsEditor from './AdminCoordinatorsEditor';
import './Admin.css';

export const Admin = () => {
  const [registrations, setRegistrations] = useState<(Registration & { id: string })[]>([]);
  const [activeTab, setActiveTab] = useState<'registrations' | 'rules' | 'events' | 'coordinators'>('registrations');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterEventType, setFilterEventType] = useState('');
  const [showImages, setShowImages] = useState<Record<string, boolean>>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [selectedRegistration, setSelectedRegistration] = useState<(Registration & { id: string }) | null>(null);

  useEffect(() => {
    fetchRegistrations();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) setScreenSize('mobile');
    else if (width < 1024) setScreenSize('tablet');
    else setScreenSize('desktop');
  };

  // Helper function to format registration date - handles Firestore Timestamp and Date strings
  const formatRegistrationDate = (timestamp: any): string => {
    try {
      // If it's a Firestore Timestamp object with toDate method
      if (timestamp && typeof timestamp.toDate === 'function') {
        return new Date(timestamp.toDate()).toLocaleDateString('en-IN');
      }
      // If it's a regular Date object
      if (timestamp instanceof Date) {
        return timestamp.toLocaleDateString('en-IN');
      }
      // If it's a string or number
      if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-IN');
        }
      }
      return 'N/A';
    } catch (err) {
      console.error('Error formatting date:', err, timestamp);
      return 'N/A';
    }
  };

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
      await exportToExcel(registrations);
    } catch (err: any) {
      setError(err.message || 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const downloadPaymentProof = (imageUrl: string, studentName: string, eventName: string) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      const timestamp = new Date().toISOString().slice(0, 10);
      const sanitizedName = studentName.replace(/\s+/g, '_').toLowerCase();
      const sanitizedEvent = eventName.replace(/\s+/g, '_').toLowerCase();
      link.download = `payment_${sanitizedName}_${sanitizedEvent}_${timestamp}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download payment proof');
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

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setFilterEventType('');
    setIsFiltersOpen(false);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-screen">
          <div className="loading-content">
            <Loader size={64} className="animate-spin text-primary" />
            <h2>Loading Dashboard</h2>
            <p className="text-muted">Fetching registration data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-main">
            <h1>
              <span className="header-title">TECH BLITZ 2K26</span>
              <span className="header-subtitle">Admin Dashboard</span>
            </h1>
            <div className="screen-indicator">
              {screenSize === 'mobile' && <Smartphone size={16} />}
              {screenSize === 'tablet' && <Tablet size={16} />}
              {screenSize === 'desktop' && <Monitor size={16} />}
              <span className="capitalize">{screenSize}</span>
            </div>
          </div>
          <button 
            className="btn-refresh"
            onClick={fetchRegistrations}
            title="Refresh data"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error slide-in">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={() => setError('')} className="alert-close">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          <Users size={18} />
          <span>Registrations</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <Settings size={18} />
          <span>Event Rules</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Users size={18} />
          <span>Edit Events</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'coordinators' ? 'active' : ''}`}
          onClick={() => setActiveTab('coordinators')}
        >
          <Users size={18} />
          <span>Coordinators</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="admin-main">
        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
        <>
        {/* Stats Overview */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Registrations</div>
              </div>
            </div>
            <div className="stat-card stat-secondary">
              <div className="stat-icon">
                <BarChart3 size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{Object.keys(stats.byDepartment).length}</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>
            <div className="stat-card stat-success">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">₹{stats.total * 150}</div>
                <div className="stat-label">Total Fees</div>
              </div>
            </div>
            <div className="stat-card stat-warning">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{new Date().getDate()}</div>
                <div className="stat-label">Today</div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="controls-section">
          <div className="controls-header">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search registrations..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="controls-actions">
              <button
                className="btn-filters"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter size={18} />
                <span>Filters</span>
                {isFiltersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table
                </button>
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
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
                    <span>Export Excel</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {isFiltersOpen && (
            <div className="filters-panel slide-down">
              <div className="filters-grid">
                <div className="filter-group">
                  <label className="filter-label">Department</label>
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
                </div>

                <div className="filter-group">
                  <label className="filter-label">Event Type</label>
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

                <div className="filter-actions">
                  <button className="btn-clear" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Results Info */}
        <div className="results-info">
          <span className="results-count">
            {filteredRegistrations.length} of {registrations.length} registrations
          </span>
          {(filterDepartment || filterEventType || searchTerm) && (
            <div className="active-filters">
              {filterDepartment && (
                <span className="active-filter">
                  Department: {DEPARTMENTS[filterDepartment as keyof typeof DEPARTMENTS]}
                  <button onClick={() => setFilterDepartment('')}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {filterEventType && (
                <span className="active-filter">
                  Event: {filterEventType}
                  <button onClick={() => setFilterEventType('')}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Registrations Display */}
        <section className="registrations-section">
          {filteredRegistrations.length > 0 ? (
            viewMode === 'table' ? (
              <div className="table-container">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>College</th>
                      <th>Department</th>
                      <th className="text-center">Year</th>
                      <th>Event</th>
                      <th className="text-center">Payment</th>
                      <th className="text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((reg) => (
                      <tr key={reg.id} onClick={() => setSelectedRegistration(reg)}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {reg.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info">
                              <div className="user-name">{reg.name}</div>
                              <div className="user-email">{reg.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="contact-cell">
                          <div className="phone">{reg.phone}</div>
                        </td>
                        <td className="college-cell">{reg.college}</td>
                        <td>
                          <span className="badge badge-dept">
                            {DEPARTMENTS[reg.department]}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="year-badge">{reg.year}</span>
                        </td>
                        <td>
                          <div className="event-cell">
                            <div className="event-name">{reg.eventName}</div>
                            <span className={`badge-event ${reg.eventType}`}>
                              {reg.eventType.replace('_', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="payment-cell">
                          {reg.paymentScreenshot ? (
                            <div className="payment-actions">
                              <button
                                className="icon-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowImages({
                                    ...showImages,
                                    [reg.id]: !showImages[reg.id]
                                  });
                                }}
                                title={showImages[reg.id] ? "Hide image" : "View image"}
                              >
                                {showImages[reg.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                              <button
                                className="icon-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadPaymentProof(reg.paymentScreenshot!, reg.name, reg.eventName);
                                }}
                                title="Download proof"
                              >
                                <FileDown size={16} />
                              </button>
                            </div>
                          ) : (
                            <span className="no-proof">Pending</span>
                          )}
                        </td>
                        <td className="date-cell text-center">
                          {reg.timestamp
                            ? formatRegistrationDate(reg.timestamp)
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Grid View for Mobile/Tablet
              <div className="grid-container">
                {filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="registration-card">
                    <div className="card-header">
                      <div className="user-avatar">
                        {reg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-main">
                        <h4 className="user-name">{reg.name}</h4>
                        <p className="user-email">{reg.email}</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-row">
                        <span className="label">Phone</span>
                        <span className="value">{reg.phone}</span>
                      </div>
                      <div className="card-row">
                        <span className="label">College</span>
                        <span className="value">{reg.college}</span>
                      </div>
                      <div className="card-row">
                        <span className="label">Department</span>
                        <span className="badge badge-dept">
                          {DEPARTMENTS[reg.department]}
                        </span>
                      </div>
                      <div className="card-row">
                        <span className="label">Event</span>
                        <div className="event-info">
                          <span className="event-name">{reg.eventName}</span>
                          <span className={`badge-event ${reg.eventType}`}>
                            {reg.eventType.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="card-row">
                        <span className="label">Payment</span>
                        {reg.paymentScreenshot ? (
                          <div className="payment-actions">
                            <button
                              className="icon-btn small"
                              onClick={() => setShowImages({
                                ...showImages,
                                [reg.id]: !showImages[reg.id]
                              })}
                            >
                              {showImages[reg.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button
                              className="icon-btn small"
                              onClick={() => downloadPaymentProof(reg.paymentScreenshot!, reg.name, reg.eventName)}
                            >
                              <FileDown size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="status pending">Pending</span>
                        )}
                      </div>
                    </div>
                    <div className="card-footer">
                      <span className="date">
                        {reg.timestamp
                          ? formatRegistrationDate(reg.timestamp)
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <div className="empty-icon">📊</div>
                <h3>No registrations found</h3>
                <p>Try adjusting your search or filters</p>
                <button className="btn-clear" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Department Statistics */}
        <section className="department-stats">
          <h3 className="section-title">
            <BarChart3 size={20} />
            <span>Department Statistics</span>
          </h3>
          <div className="stats-chart">
            {Object.entries(stats.byDepartment)
              .sort(([, a], [, b]) => b - a)
              .map(([dept, count]) => {
                const percentage = (count / stats.total) * 100;
                return (
                  <div key={dept} className="chart-item">
                    <div className="chart-label">
                      <span>{DEPARTMENTS[dept as keyof typeof DEPARTMENTS]}</span>
                      <span className="chart-count">{count}</span>
                    </div>
                    <div className="chart-bar">
                      <div 
                        className="chart-fill" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
        </>
        )}

        {/* Rules Editor Tab */}
        {activeTab === 'rules' && (
          <AdminRulesEditor />
        )}


        {/* Events Editor Tab */}
        {activeTab === 'events' && (
          <AdminEventsEditor />
        )}

        {/* Coordinators Editor Tab */}
        {activeTab === 'coordinators' && (
          <AdminCoordinatorsEditor />
        )}
      </main>

      {/* Modal for Image Preview */}
      {selectedRegistration && activeTab === 'registrations' && (
        <div className="modal-overlay" onClick={() => setSelectedRegistration(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedRegistration.name}'s Details</h3>
              <button className="modal-close" onClick={() => setSelectedRegistration(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-item">
                  <span className="modal-label">Email</span>
                  <span className="modal-value">{selectedRegistration.email}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Phone</span>
                  <span className="modal-value">{selectedRegistration.phone}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">College</span>
                  <span className="modal-value">{selectedRegistration.college}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Department</span>
                  <span className="modal-value badge-dept">
                    {DEPARTMENTS[selectedRegistration.department]}
                  </span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Event</span>
                  <span className="modal-value">{selectedRegistration.eventName}</span>
                </div>
                <div className="modal-item">
                  <span className="modal-label">Event Type</span>
                  <span className={`modal-value badge-event ${selectedRegistration.eventType}`}>
                    {selectedRegistration.eventType.replace('_', ' ')}
                  </span>
                </div>
              </div>
              {selectedRegistration.paymentScreenshot && (
                <div className="modal-image">
                  <h4>Payment Proof</h4>
                  <img 
                    src={selectedRegistration.paymentScreenshot} 
                    alt="Payment proof"
                    className="payment-image" 
                  />
                  <button
                    className="btn-download"
                    onClick={() => downloadPaymentProof(
                      selectedRegistration!.paymentScreenshot!,
                      selectedRegistration!.name,
                      selectedRegistration!.eventName
                    )}
                  >
                    <Download size={16} />
                    Download Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;