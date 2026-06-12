import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getTicketThread,
  replyTicket,
  assignTicket,
  updateTicketStatus,
} from '../../services/ticketService';
import { getSupportUsers } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import './tickets.css';

const getSenderLabel = (sender) => sender?.name || sender?.email || 'Unknown';

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

  const canAssign = useMemo(
    () => ['ADMIN', 'ADMIN_SUPPORT'].includes(user?.role),
    [user?.role]
  );

  const canUpdateStatus = useMemo(
    () => ['SUPPORT', 'ADMIN_SUPPORT', 'ADMIN'].includes(user?.role),
    [user?.role]
  );

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

  if (loading) {
    return (
      <div className="t-page">
        <div className="t-container">
          <p className="t-meta">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="t-page">
        <div className="t-container">
          {error && <div className="t-alert t-alert--error">{error}</div>}
          <div className="t-top" style={{ marginTop: 16 }}>
            <Link to="/tickets" className="chat-link">← Back to Tickets</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="t-page">
      <div className="t-container">

        {/* Top bar */}
        <div className="t-top">
          <h1 className="t-title">Ticket Detail</h1>
          <Link to="/tickets" className="chat-link">← Back to Tickets</Link>
        </div>

        {/* Feedback */}
        {msg && <div className="t-alert t-alert--success">{msg}</div>}
        {error && <div className="t-alert t-alert--error">{error}</div>}

        {/* Ticket card */}
        <div className="t-card">
          <div className="t-headline">
            <h2 className="t-subject">{ticket.subject}</h2>
            <div className="t-badges">
              <span className={`t-badge t-badge--status${isClosed ? ' t-badge--closed' : ''}`}>
                {ticket.status}
              </span>
              <span className={`t-badge t-badge--prio${
                ticket.priority === 'HIGH'
                  ? 'High'
                  : ticket.priority === 'MEDIUM'
                  ? 'Med'
                  : 'Low'
              }`}>
                {ticket.priority}
              </span>
            </div>
          </div>

          {/* Ticket meta — uses name now */}
          <div className="t-meta">
            <div>Opened by: <strong>{getSenderLabel(ticket.createdBy)}</strong></div>
            {ticket.assignedTo && (
              <div>Assigned to: <strong>{getSenderLabel(ticket.assignedTo)}</strong></div>
            )}
            <div>{formatTime(ticket.createdAt)}</div>
          </div>

          {/* Admin/Support controls */}
          {(canAssign || canUpdateStatus) && (
            <>
              <hr className="t-divider" />
              <div className="t-actionsBar">

                {canAssign && supportUsers.length > 0 && (
                  <div className="t-actionsLeft">
                    <select
                      className="t-select"
                      value={selectedSupportId}
                      onChange={(e) => setSelectedSupportId(e.target.value)}
                    >
                      <option value="">Assign to agent...</option>
                      {supportUsers.map((su) => (
                        <option key={su.id} value={su.id}>
                          {su.name || su.email}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="t-btn"
                      onClick={onAssign}
                      disabled={busy || !selectedSupportId}
                    >
                      Assign
                    </button>
                  </div>
                )}

                {canUpdateStatus && (
                  <div className="t-actionsRight">
                    {['OPEN', 'IN_PROGRESS', 'CLOSED'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`t-btn${ticket.status === s ? ' t-btn--danger' : ''}`}
                        onClick={() => onStatus(s)}
                        disabled={busy || ticket.status === s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </>
          )}
        </div>

        {/* Conversation thread */}
        <div className="chat-wrap">
          <h3 className="chat-title">Conversation</h3>

          <div className="chat-box">
            {ticket.messages.length === 0 ? (
              <p className="chat-empty">No messages yet.</p>
            ) : (
              ticket.messages.map((m) => {
                const isOwn = m.sender?.id === user?.id;
                return (
                  <div
                    key={m.id}
                    className={`chat-msg${isOwn ? ' chat-msg--me' : ''}`}
                  >
                    <div className={`chat-bubble${isOwn ? ' chat-bubble--me' : ''}`}>
                      {/* sender name instead of email */}
                      <div className="chat-from">
                        <strong>{getSenderLabel(m.sender)}</strong>
                        {' · '}
                        <span>{m.sender?.role}</span>
                      </div>
                      <div className="chat-text">{m.message}</div>
                      <div className="chat-time">{formatTime(m.createdAt)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Reply form */}
          {!isClosed ? (
            <form className="chat-form" onSubmit={onSubmitReply}>
              <textarea
                className="chat-input"
                rows={2}
                placeholder="Type your reply..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="t-btn t-btn--primary"
                disabled={busy || !message.trim()}
              >
                {busy ? 'Sending...' : 'Send'}
              </button>
            </form>
          ) : (
            <div className="chat-actions">
              <span className="t-miniNote">This ticket is closed. No further replies.</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}