// Admin Events Editor Component
import { useState, useEffect } from 'react';
import { Edit2, Save, Trash2, Loader, Search } from 'lucide-react';
import {
  getAllEventsFromFirestore,
  updateEventInFirestore,
  saveEventToFirestore,
  deleteEventFromFirestore
} from '../firestoreEventDataUtils';
import type { TechEvent } from '../firestoreEventDataUtils';
import './AdminEventsEditor.css';

export const AdminEventsEditor = () => {
  const [events, setEvents] = useState<TechEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TechEvent>>({});
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllEventsFromFirestore();
      setEvents(data);
    } catch (err) {
      setError(`Failed to load events: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: TechEvent) => {
    setEditingId(event.id);
    setEditData({ ...event });
  };

  const handleSave = async () => {
    if (!editData.id || !editData.name || !editData.department || !editData.type) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (editingId && events.find(e => e.id === editingId)) {
        await updateEventInFirestore(editData.id, editData);
      } else {
        await saveEventToFirestore(editData as TechEvent);
      }

      setEditingId(null);
      setEditData({});
      await loadEvents();
    } catch (err) {
      setError(`Failed to save event: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm('Delete this event?')) return;

    try {
      setSaving(true);
      setError('');
      await deleteEventFromFirestore(eventId);
      await loadEvents();
    } catch (err) {
      setError(`Failed to delete event: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-events-editor">
        <div className="loading-center">
          <Loader size={40} className="animate-spin" />
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-events-editor">
      <div className="editor-header">
        <h2>🎯 Events Management</h2>
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      {editingId ? (
        <div className="event-editor-form">
          <h3>Edit Event</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Event ID</label>
              <input
                type="text"
                value={editData.id || ''}
                onChange={(e) => setEditData({ ...editData, id: e.target.value })}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Event Name *</label>
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <select
                value={editData.department || ''}
                onChange={(e) => setEditData({ ...editData, department: e.target.value })}
              >
                <option value="">Select Department</option>
                <option value="auto_mech">AUTO / MECH</option>
                <option value="cse_aiml">CSE / AIML</option>
                <option value="eee_ece">EEE / ECE</option>
                <option value="civil">CIVIL</option>
                <option value="mlt">MLT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Event Type *</label>
              <select
                value={editData.type || ''}
                onChange={(e) => setEditData({ ...editData, type: e.target.value as any })}
              >
                <option value="">Select Type</option>
                <option value="technical">Technical</option>
                <option value="non_technical">Non-Technical</option>
                <option value="paper_presentation">Paper Presentation</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={editData.description || ''}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              className="btn-save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              Save
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                setEditingId(null);
                setEditData({});
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="events-list">
        <h3>Events ({filteredEvents.length})</h3>
        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h4>{event.name}</h4>
                  <span className={`badge dept-${event.department}`}>
                    {event.department.toUpperCase()}
                  </span>
                </div>
                <p className="event-desc">{event.description}</p>
                <span className={`event-type type-${event.type}`}>
                  {event.type.replace('_', ' ')}
                </span>
                <div className="event-actions">
                  <button
                    className="icon-btn edit"
                    onClick={() => handleEdit(event)}
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(event.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsEditor;
