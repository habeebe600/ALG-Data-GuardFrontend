import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createStaffUser } from '../../services/authService';
import '../Tickets/tickets.css';

export default function CreateStaff() {
  const { user, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('SUPPORT');

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setSubmitting(true);
    try {
      const data = await createStaffUser({ email, password, role });
      setMsg(data?.message || 'Staff created');
      setEmail('');
      setPassword('');
      setRole('SUPPORT');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create staff');
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="t-page">
    <div className="t-container" style={{ maxWidth: 720 }}>
      <div className="t-top">
        <h2 className="t-title">Create Staff</h2>
        <Link className="chat-link" to="/admin">Back to admin</Link>
      </div>

      {msg ? <div className="t-alert t-alert--success">{msg}</div> : null}
      {error ? <div className="t-alert t-alert--error">{error}</div> : null}

      <section className="t-card">
        <form onSubmit={onSubmit} className="t-form" style={{ maxWidth: 560 }}>
          <div>
            <div className="t-label">Email</div>
            <input
              className="t-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <div className="t-label">Password</div>
            <input
              className="t-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <div className="t-label">Role</div>
            <select
              className="t-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={submitting}
            >
              <option value="SUPPORT">SUPPORT</option>
              <option value="ADMIN_SUPPORT">ADMIN_SUPPORT</option>
            </select>
          </div>

          <button className="t-btn t-btn--primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create staff'}
          </button>
        </form>
      </section>
    </div>
  </div>
);

}
