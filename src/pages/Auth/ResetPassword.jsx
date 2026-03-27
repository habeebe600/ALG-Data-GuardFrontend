import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword, resendResetOtp } from '../../services/authService';
import PasswordInput from './PasswordInput';
import './styles/Login.css';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const onResend = async () => {
    setMsg('');
    setError('');
    try {
      await resendResetOtp(email);
      setMsg('OTP resent');
      setResendIn(30);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to resend OTP');
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setSubmitting(true);
    try {
      const data = await resetPassword({ email, otp, newPassword }); // POST /auth/reset-password [file:32]
      setMsg(data?.message || 'Password reset successful');
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Password reset failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Reset password</h2>
          <p className="auth-subtitle">Enter OTP and set a new password.</p>
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

          <div className="auth-field">
            <label className="auth-label">OTP</label>
            <input
              className="auth-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>

          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Create a new password"
            required
          />

          <button className="auth-button" disabled={submitting} type="submit">
            {submitting ? 'Resetting...' : 'Reset password'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">Back to login</Link>
          <button
            className="auth-button"
            type="button"
            disabled={submitting || resendIn > 0}
            onClick={onResend}
            style={{ height: 5, marginTop: 0, background: 'transparent' }}
          >
            {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
