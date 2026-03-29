import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import PasswordInput from './PasswordInput';
import './styles/Login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setSubmitting(true);
    try {
      const data = await registerUser({ email, password, businessName, phone });
      setMsg(data?.message || 'OTP sent');
      navigate('/verify', { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Register your business and verify with OTP.</p>
        </div>

        {msg ? <div className="auth-alert" style={{ borderColor: 'rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.08)', color: 'rgba(220,255,235,0.95)' }}>{msg}</div> : null}
        {error ? <div className="auth-alert">{error}</div> : null}

        <form onSubmit={onSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Business name</label>
            <input
              className="auth-input"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Phone (optional)</label>
            <input
              className="auth-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1"
            />
          </div>

          <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />


          <button className="auth-button" disabled={submitting} type="submit">
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
