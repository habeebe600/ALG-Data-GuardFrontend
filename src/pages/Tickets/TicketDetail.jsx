import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getTicketThread, replyTicket, assignTicket, updateTicketStatus } from '../../services/ticketService';
import { getSupportUsers } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import './tickets.css';

export default function TicketDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState('');

  const [supportUsers, setSupportUsers] = useState([]);
  const [selectedSupportId, setSelectedSupportId] = useState('');

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const canAssign = useMemo(() => ['ADMIN', 'ADMIN_SUPPORT'].includes(user?.role), [user?.role]);
  const canUpdateStatus = useMemo(() => ['SUPPORT', 'ADMIN_SUPPORT', 'ADMIN'].includes(user?.role), [user?.role]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTicketThread(id);
      setTicket(data);
      setSelectedSupportId(data.assignedToId || data.assignedTo?.id || '');
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load ticket');
      setTicket(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const run = async () => {
      if (!canAssign) return;
      try {
        const data = await getSupportUsers();
        setSupportUsers(data);
      } catch {
        // ignore
      }
    };
    run();
  }, [canAssign]);

  const isClosed = ticket?.status === 'CLOSED';

  const onSubmitReply = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await replyTicket(id, { message });
      setMsg(data?.message || 'Reply sent');
      setMessage('');
      await load();
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Reply failed');
    } finally {
      setBusy(false);
    }
  };

  const onAssign = async () => {
    if (!selectedSupportId) return;
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await assignTicket(id, { supportUserId: selectedSupportId });
      setMsg(data?.message || 'Ticket assigned');
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Assign failed');
    } finally {
      setBusy(false);
    }
  };

  const onStatus = async (status) => {
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await updateTicketStatus(id, { status });
      setMsg(data?.message || 'Status updated');
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Status update failed');
    } finally {
      setBusy(false);
    }
  };

  const formatTime = (iso) => {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return '';
    }
  };

  return (
    <div className="t-page">
      <div className="t-container">
        <div className="t-top">
          <h2 className="t-title">Ticket</h2>
          <button className="t-btn" onClick={() => navigate(-1)} disabled={busy}>Back</button>
        </div>

        {msg ? <div className="t-alert t-alert--success">{msg}</div> : null}
        {error ? <div className="t-alert t-alert--error">{error}</div> : null}
        {loading ? <div className="t-alert">Loading...</div> : null}

        {ticket ? (
          <>
            <section className="t-card">
              <div className="t-headline">
                <h3 className="t-subject">{ticket.subject}</h3>
              
              </div>

              <div className="t-meta">
  Created by: {ticket.createdBy?.email || '—'} <br />
  Assigned: {ticket.assignedTo?.email || 'Unassigned'}
</div>

<div className="t-badgeRow">
  <span className={`t-badge ${ticket.status === 'CLOSED' ? 't-badge--closed' : 't-badge--status'}`}>
    {ticket.status}
  </span>
  <span
    className={`t-badge ${
      ticket.priority === 'HIGH'
        ? 't-badge--prioHigh'
        : ticket.priority === 'MEDIUM'
          ? 't-badge--prioMed'
          : 't-badge--prioLow'
    }`}
  >
    {ticket.priority || '—'}
  </span>
</div>

<hr className="t-divider" />

<div className="t-actionsBar">
  <div className="t-actionsLeft">
    {canAssign && !isClosed ? (
      <>
        <select
          className="t-select"
          value={selectedSupportId}
          onChange={(e) => setSelectedSupportId(e.target.value)}
          disabled={busy}
        >
          <option value="">Select support agent</option>
          {supportUsers.map((su) => (
            <option key={su.id} value={su.id}>
              {su.email}
            </option>
          ))}
        </select>

        <button
          className="t-btn t-btn--primary"
          onClick={onAssign}
          disabled={busy || !selectedSupportId}
        >
          Assign
        </button>
      </>
    ) : (
      <span className="t-miniNote">
        {canAssign ? 'Ticket closed' : 'No assign permission'}
      </span>
    )}
  </div>

  <div className="t-actionsRight">
    {canUpdateStatus && !isClosed ? (
      <>
        <button className="t-btn" disabled={busy} onClick={() => onStatus('IN_PROGRESS')}>
          In Progress
        </button>
        <button className="t-btn t-btn--danger" disabled={busy} onClick={() => onStatus('CLOSED')}>
          Close
        </button>
      </>
    ) : (
      <span className="t-miniNote">
        {canUpdateStatus ? 'Ticket closed' : 'No status permission'}
      </span>
    )}
  </div>
</div>

{isClosed ? <div className="t-meta" style={{ marginTop: 10 }}>This ticket is closed.</div> : null}


              {isClosed ? <div className="t-meta" style={{ marginTop: 10 }}>This ticket is closed.</div> : null}
            </section>

            <section className="t-card chat-wrap">
              <h3 className="chat-title">Chat</h3>

              <div className="chat-box">
                {(ticket.messages || []).length === 0 ? (
                  <div className="chat-empty">No messages yet.</div>
                ) : null}

                {(ticket.messages || []).map((m) => {
                  const mine = m.senderId === user?.id;
                  return (
                    <div key={m.id} className={`chat-msg ${mine ? 'chat-msg--me' : ''}`}>
                      <div className={`chat-bubble ${mine ? 'chat-bubble--me' : ''}`}>
                        <div className="chat-from">{m.sender?.email || 'User'}</div>
                        <div className="chat-text">{m.message}</div>
                        <div className="chat-time">{formatTime(m.createdAt)}</div>
                      </div>
                    </div>
                  );
                })}

              </div>

              <form onSubmit={onSubmitReply} className="chat-form">
                <textarea
                  className="chat-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isClosed ? 'Ticket is closed' : 'Type a message...'}
                  disabled={busy || isClosed}
                  required
                  rows={3}
                />
                <button className="t-btn t-btn--primary" disabled={busy || isClosed} type="submit">
                  Send
                </button>
              </form>

              <div className="chat-actions">
                <Link to="/tickets" className="chat-link">Back to tickets</Link>
               
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  );
}
