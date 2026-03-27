import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createStaffUser } from '../../services/authService';
import { getAllUsers, setUserBlocked } from '../../services/userService';
import '../Tickets/tickets.css';


export default function AdminPanel() {
  const [tab, setTab] = useState('createStaff'); // createStaff | users

  const { user } = useAuth();
const isAdmin = user?.role === 'ADMIN';

  // create staff
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('SUPPORT');
  const [busy, setBusy] = useState(false);

  // users
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setError('');
    try {
      const data = await getAllUsers(roleFilter || undefined);
      setUsers(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load users');
    }
  };

  useEffect(() => {
    if (tab === 'users') loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, roleFilter]);

  const onCreateStaff = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await createStaffUser({ email, password, role });
      setMsg(data?.message || 'Staff created');
      setEmail('');
      setPassword('');
      setRole('SUPPORT');
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Failed to create staff');
    } finally {
      setBusy(false);
    }
  };

   return (
    <div className="t-page">
      <div className="t-container">
        <div className="t-top">
          <h2 className="t-title">Admin Panel</h2>
        </div>

        <div className="t-tabs">
          <button
            className={`t-tab ${tab === 'createStaff' ? 'is-active' : ''}`}
            onClick={() => setTab('createStaff')}
            disabled={busy}
            type="button"
          >
            Create staff
          </button>
          <button
            className={`t-tab ${tab === 'users' ? 'is-active' : ''}`}
            onClick={() => setTab('users')}
            disabled={busy}
            type="button"
          >
            Users
          </button>
        </div>

        {msg ? <div className="t-alert t-alert--success">{msg}</div> : null}
        {error ? <div className="t-alert t-alert--error">{error}</div> : null}

        {tab === 'createStaff' ? (
          <section className="t-card">
            <h3 className="chat-title" style={{ marginTop: 0 }}>Create Staff User</h3>

            <form onSubmit={onCreateStaff} className="t-form" style={{ maxWidth: 520 }}>
              <div>
                <div className="t-label">Email</div>
                <input className="t-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required disabled={busy} />
              </div>

              <div>
                <div className="t-label">Password</div>
                <input className="t-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required disabled={busy} />
              </div>

              <div>
                <div className="t-label">Role</div>
                <select className="t-select" value={role} onChange={(e) => setRole(e.target.value)} disabled={busy}>
                  <option value="SUPPORT">SUPPORT</option>
                  <option value="ADMIN_SUPPORT">ADMIN_SUPPORT</option>
                </select>
              </div>

              <button className="t-btn t-btn--primary" type="submit" disabled={busy}>
                {busy ? 'Creating...' : 'Create'}
              </button>
            </form>
          </section>
        ) : null}

        {tab === 'users' ? (
          <section className="t-card">
            <div className="t-top" style={{ margin: 0 }}>
              <h3 className="chat-title" style={{ margin: 0 }}>All Users</h3>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <select className="t-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} disabled={busy}>
                  <option value="">All roles</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="ADMIN_SUPPORT">ADMIN_SUPPORT</option>
                  <option value="SUPPORT">SUPPORT</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
                <button className="t-btn" type="button" onClick={loadUsers} disabled={busy}>Refresh</button>
              </div>
            </div>

            <div className="t-list">
              {users.map((u) => (
                <div key={u.id} className="t-ticket" style={{ cursor: 'default' }}>
  <div className="t-ticketTop">
    {/* Left */}
    <div>
      <div className="t-subject" style={{ fontSize: 16 }}>{u.email}</div>
      <div className="t-ticketMeta">
        Role: {u.role} | Verified: {String(u.isVerified)} | Business: {u.business?.name || '—'}
      </div>
    </div>

    {/* Right (status + action) */}
    <div className="t-badges">
  <span className={`t-badge ${u.isBlocked ? 't-badge--closed' : 't-badge--status'}`}>
    {u.isBlocked ? 'BLOCKED' : 'ACTIVE'}
  </span>

  {isAdmin ? (
    <button
      className={`t-btn ${u.isBlocked ? '' : 't-btn--danger'}`}
      type="button"
      disabled={
        busy ||
        u.id === user?.id ||         // can't block yourself
        u.role === 'ADMIN'           // can't block any admin account
      }
      title={
        u.id === user?.id
          ? "You can't block your own account"
          : u.role === 'ADMIN'
            ? "You can't block an ADMIN account"
            : ''
      }
      onClick={async () => {
        setError('');
        try {
          await setUserBlocked(u.id, !u.isBlocked);
          await loadUsers();
        } catch (e) {
          setError(e?.response?.data?.message || 'Failed to update user');
        }
      }}
    >
      {u.isBlocked ? 'Unblock' : 'Block'}
    </button>
  ) : null}
</div>

  </div>
</div>

              ))}
              {users.length === 0 ? <div className="t-alert">No users found.</div> : null}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
