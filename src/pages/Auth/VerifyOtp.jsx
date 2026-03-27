import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verifyAccountOtp, resendOtp } from '../../services/authService';
import './styles/Login.css';

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
const [resendIn, setResendIn] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  if (resendIn <= 0) return;
  const t = setInterval(() => setResendIn((s) => s - 1), 1000);
  return () => clearInterval(t);
}, [resendIn]);

const onResend = async () => {
  setMsg('');
  setError('');
  try {
    await resendOtp(email);
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
      const data = await verifyAccountOtp({ email, otp }); // POST /auth/verify [file:32]
      setMsg(data?.message || 'Account verified');
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'OTP verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Verify OTP</h2>
          <p className="auth-subtitle">Enter the OTP sent to your email to activate your account.</p>
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

          <button className="auth-button" disabled={submitting} type="submit">
            {submitting ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="auth-links">
          <button className="t-btn" type="button" disabled={resendIn > 0} onClick={onResend}>
  {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend OTP'}
</button>

          <Link to="/login" className="auth-link">Back to login</Link>
          <Link to="/register" className="auth-link">Need an account?</Link>
        </div>
      </div>
    </div>
  );
}
