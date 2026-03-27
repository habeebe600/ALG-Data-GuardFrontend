import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { changePassword } from '../../services/authService';
import PasswordInput from './PasswordInput';
import './styles/Login.css';

export default function ChangePassword() {
  const { user, loading } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (newPassword !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setBusy(true);
    try {
      const data = await changePassword({ currentPassword, newPassword });
      setMsg(data?.message || 'Password changed');
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Failed to change password');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Change password</h2>
          <p className="auth-subtitle">Update your password for this account.</p>
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

        <form className="auth-form" onSubmit={onSubmit}>

          <PasswordInput
            label="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            disabled={busy}
            placeholder="enter your current password"
          />


          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={busy}
            placeholder="enter your new password"

          />

          <PasswordInput
            label="confirm New password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            disabled={busy}
            placeholder="confim your new password"
          />

          <button className="auth-button" disabled={busy} type="submit">
            {busy ? 'Saving...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );

}
