// Admin Coordinators Editor Component
import { useState, useEffect } from 'react';
import { Edit2, Save, Trash2, Loader, Search, Plus } from 'lucide-react';
import type { DepartmentInfo, Coordinator } from '../firestoreEventDataUtils';
import {
  getAllDepartmentsFromFirestore,
  updateDepartmentInFirestore
} from '../firestoreEventDataUtils';
import './AdminCoordinatorsEditor.css';

export const AdminCoordinatorsEditor = () => {
  const [departments, setDepartments] = useState<DepartmentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<DepartmentInfo>>({});
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllDepartmentsFromFirestore();
      setDepartments(data);
    } catch (err) {
      setError(`Failed to load departments: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDept = (dept: DepartmentInfo) => {
    setEditingDeptId(dept.id);
    setEditData({ ...dept });
  };

  const handleSaveDept = async () => {
    if (!editData.id || !editData.name) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updateDepartmentInFirestore(editData.id, editData);
      setEditingDeptId(null);
      setEditData({});
      await loadDepartments();
    } catch (err) {
      setError(`Failed to save: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCoordinator = (deptId: string, role: 'staff' | 'student') => {
    const currentArray = role === 'staff' ? editData.staff || [] : editData.students || [];
    const newCoordinator: Coordinator = {
      id: `coord_${Date.now()}`,
      name: '',
      role,
      phone: '',
      department: deptId
    };
    
    if (role === 'staff') {
      setEditData({ ...editData, staff: [...currentArray, newCoordinator] });
    } else {
      setEditData({ ...editData, students: [...currentArray, newCoordinator] });
    }
  };

  const handleRemoveCoordinator = (coordId: string, role: 'staff' | 'student') => {
    if (role === 'staff') {
      setEditData({
        ...editData,
        staff: (editData.staff || []).filter(c => c.id !== coordId)
      });
    } else {
      setEditData({
        ...editData,
        students: (editData.students || []).filter(c => c.id !== coordId)
      });
    }
  };

  const handleCoordinatorChange = (
    _deptId: string,
    coordId: string,
    field: keyof Coordinator,
    value: string,
    role: 'staff' | 'student'
  ) => {
    const currentArray = role === 'staff' ? editData.staff || [] : editData.students || [];
    const updated = currentArray.map(c =>
      c.id === coordId ? { ...c, [field]: value } : c
    );

    if (role === 'staff') {
      setEditData({ ...editData, staff: updated });
    } else {
      setEditData({ ...editData, students: updated });
    }
  };

  const filteredDepts = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-coordinators-editor">
        <div className="loading-center">
          <Loader size={40} className="animate-spin" />
          <p>Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-coordinators-editor">
      <div className="editor-header">
        <h2>👥 Coordinators Management</h2>
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search departments..."
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

      {editingDeptId ? (
        <div className="dept-editor-form">
          <h3>Edit Department: {editData.name}</h3>
          
          {/* Staff Section */}
          <div className="coordinators-section">
            <div className="section-header">
              <h4>👨‍🏫 Staff Coordinators</h4>
              <button
                className="btn-add-small"
                onClick={() => handleAddCoordinator(editData.id!, 'staff')}
              >
                <Plus size={16} /> Add Staff
              </button>
            </div>
            {(editData.staff || []).map((coord) => (
              <div key={coord.id} className="coordinator-row">
                <input
                  type="text"
                  placeholder="Name"
                  value={coord.name}
                  onChange={(e) =>
                    handleCoordinatorChange(editData.id!, coord.id, 'name', e.target.value, 'staff')
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={coord.phone}
                  onChange={(e) =>
                    handleCoordinatorChange(editData.id!, coord.id, 'phone', e.target.value, 'staff')
                  }
                />
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveCoordinator(coord.id, 'staff')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Students Section */}
          <div className="coordinators-section">
            <div className="section-header">
              <h4>👨‍🎓 Student Coordinators</h4>
              <button
                className="btn-add-small"
                onClick={() => handleAddCoordinator(editData.id!, 'student')}
              >
                <Plus size={16} /> Add Student
              </button>
            </div>
            {(editData.students || []).map((coord) => (
              <div key={coord.id} className="coordinator-row">
                <input
                  type="text"
                  placeholder="Name"
                  value={coord.name}
                  onChange={(e) =>
                    handleCoordinatorChange(editData.id!, coord.id, 'name', e.target.value, 'student')
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={coord.phone}
                  onChange={(e) =>
                    handleCoordinatorChange(editData.id!, coord.id, 'phone', e.target.value, 'student')
                  }
                />
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveCoordinator(coord.id, 'student')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button
              className="btn-save"
              onClick={handleSaveDept}
              disabled={saving}
            >
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              Save Changes
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                setEditingDeptId(null);
                setEditData({});
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="departments-list">
        <h3>Departments ({filteredDepts.length})</h3>
        {filteredDepts.length > 0 ? (
          <div className="departments-grid">
            {filteredDepts.map((dept) => (
              <div key={dept.id} className="dept-card">
                <div className="dept-header">
                  <h4>{dept.name}</h4>
                </div>
                <div className="dept-info">
                  <div className="coord-group">
                    <span className="label">👨‍🏫 Staff: {dept.staff?.length || 0}</span>
                    {dept.staff?.map(s => (
                      <div key={s.id} className="coord-item">
                        {s.name} - {s.phone}
                      </div>
                    ))}
                  </div>
                  <div className="coord-group">
                    <span className="label">👨‍🎓 Students: {dept.students?.length || 0}</span>
                    {dept.students?.map(s => (
                      <div key={s.id} className="coord-item">
                        {s.name} - {s.phone}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="btn-edit"
                  onClick={() => handleEditDept(dept)}
                >
                  <Edit2 size={16} /> Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No departments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoordinatorsEditor;
