// Admin Event Rules Editor Component
import { useState, useEffect } from 'react';
import { Edit2, Save, X, Plus, Trash2, Loader } from 'lucide-react';
import { 
  getAllEventRulesFromFirestore, 
  updateEventRuleInFirestore,
  saveEventRuleToFirestore,
  deleteEventRuleFromFirestore
} from '../firestoreRulesUtils';
import type { EventRule } from '../firestoreRulesUtils';
import './AdminRulesEditor.css';

export const AdminRulesEditor = () => {
  const [rules, setRules] = useState<EventRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<EventRule>>({});
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      setLoading(true);
      setError('');
      const rulesData = await getAllEventRulesFromFirestore();
      const rulesArray = Object.values(rulesData).map((rule, idx) => ({
        id: `rule_${idx}`,
        eventName: Object.keys(rulesData)[idx],
        title: rule.title,
        rules: rule.rules
      }));
      setRules(rulesArray);
    } catch (err) {
      setError(`Failed to load rules: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rule: EventRule) => {
    setEditingId(rule.id);
    setEditData({ ...rule });
  };

  const handleSave = async () => {
    if (!editData.eventName || !editData.title || !editData.rules) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError('');
      
      const ruleToSave: EventRule = {
        id: editData.id || `rule_${Date.now()}`,
        eventName: editData.eventName,
        title: editData.title,
        rules: editData.rules,
        lastUpdated: new Date()
      };

      if (editingId && rules.find(r => r.id === editingId)) {
        // Update existing
        await updateEventRuleInFirestore(editData.eventName, ruleToSave);
      } else {
        // Save new
        await saveEventRuleToFirestore(ruleToSave);
      }

      setEditingId(null);
      setEditData({});
      await loadRules();
    } catch (err) {
      setError(`Failed to save rule: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventName: string) => {
    if (!window.confirm(`Delete rules for ${eventName}?`)) return;

    try {
      setSaving(true);
      setError('');
      await deleteEventRuleFromFirestore(eventName);
      await loadRules();
    } catch (err) {
      setError(`Failed to delete rule: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const addRuleLine = () => {
    if (editData.rules) {
      setEditData({
        ...editData,
        rules: [...editData.rules, '']
      });
    }
  };

  const removeRuleLine = (index: number) => {
    if (editData.rules) {
      setEditData({
        ...editData,
        rules: editData.rules.filter((_, i) => i !== index)
      });
    }
  };

  const updateRuleLine = (index: number, value: string) => {
    if (editData.rules) {
      const newRules = [...editData.rules];
      newRules[index] = value;
      setEditData({ ...editData, rules: newRules });
    }
  };

  const filteredRules = rules.filter(rule => 
    rule.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="rules-editor-container">
        <div className="loading">
          <Loader size={40} className="animate-spin" />
          <p>Loading event rules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rules-editor-container">
      <div className="rules-editor-header">
        <h2>📋 Event Rules Manager</h2>
        <p>Edit event rules and manage them from Firestore</p>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError('')}><X size={16} /></button>
        </div>
      )}

      <div className="rules-search">
        <input
          type="text"
          placeholder="Search event rules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {editingId ? (
        <div className="rule-editor-form">
          <h3>Edit Event Rule</h3>
          
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              value={editData.eventName || ''}
              onChange={(e) => setEditData({ ...editData, eventName: e.target.value })}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editData.title || ''}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Rules</label>
            <div className="rules-list-editor">
              {editData.rules?.map((rule, idx) => (
                <div key={idx} className="rule-input-row">
                  <span className="rule-number">{idx + 1}</span>
                  <textarea
                    value={rule}
                    onChange={(e) => updateRuleLine(idx, e.target.value)}
                    placeholder={`Rule ${idx + 1}`}
                  />
                  <button 
                    onClick={() => removeRuleLine(idx)}
                    className="btn-remove-rule"
                    title="Remove rule"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addRuleLine} className="btn-add-rule">
              <Plus size={16} /> Add Rule
            </button>
          </div>

          <div className="form-actions">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="btn-save"
            >
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
            <button 
              onClick={() => setEditingId(null)}
              className="btn-cancel"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="rules-list">
          {filteredRules.length === 0 ? (
            <div className="empty-state">
              <p>No event rules found</p>
              <p className="text-muted">Push hardcoded rules to Firestore first</p>
            </div>
          ) : (
            filteredRules.map((rule) => (
              <div key={rule.id} className="rule-card">
                <div className="rule-card-header">
                  <div>
                    <h4>{rule.eventName}</h4>
                    <p className="rule-title">{rule.title}</p>
                  </div>
                  <div className="rule-actions">
                    <button
                      onClick={() => handleEdit(rule)}
                      className="btn-edit"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(rule.eventName)}
                      className="btn-delete"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="rule-card-body">
                  <ol className="rules-preview">
                    {rule.rules.slice(0, 3).map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                    {rule.rules.length > 3 && (
                      <li className="more-rules">+{rule.rules.length - 3} more rules</li>
                    )}
                  </ol>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRulesEditor;
