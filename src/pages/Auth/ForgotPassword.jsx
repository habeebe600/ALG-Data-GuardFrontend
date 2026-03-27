import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';
import './styles/Login.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
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
      const data = await forgotPassword({ email }); // POST /auth/forgot-password [file:32]
      setMsg(data?.message || 'OTP sent');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Forgot password</h2>
          <p className="auth-subtitle">Enter your email and we’ll send you an OTP to reset your password.</p>
        </div>

        {msg ? (
          <div
            className="auth-alert"
            style={{
              borderColor: 'rgba(34,197,94,0.25)',
              background: 'rgba(34,197,94,0.08)',
              color: 'rgba(220,255,235,0.95)'
            }}
          >
            {msg}
          </div>
        ) : null}

        {error ? <div className="auth-alert">{error}</div> : null}

        <form onSubmit={onSubmit} className="auth-form">
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

          <button className="auth-button" disabled={submitting} type="submit">
            {submitting ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
