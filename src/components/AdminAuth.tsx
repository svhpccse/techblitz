// Admin Authentication Component
import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import './AdminAuth.css';

interface AdminAuthProps {
  onAuthenticate: () => void;
}

export const AdminAuth = ({ onAuthenticate }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  // Simple password - change this to your desired password
  const ADMIN_PASSWORD = 'tech@blitz2k26';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      // Store auth in session storage (expires when browser closes)
      sessionStorage.setItem('admin-auth', 'true');
      onAuthenticate();
    } else {
      setAttempt(attempt + 1);
      setError('Invalid password. Please try again.');
      if (attempt >= 2) {
        setError('Too many attempts. Please refresh the page and try again.');
      }
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <Lock size={48} />
          <h2>Admin Access Required</h2>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Enter Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              disabled={attempt >= 3}
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={attempt >= 3}
          >
            {attempt >= 3 ? 'Access Denied' : 'Access Admin Panel'}
          </button>
        </form>

        <p className="auth-note">Contact administrator for password</p>
      </div>
    </div>
  );
};

export default AdminAuth;
