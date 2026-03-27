import { useEffect, useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTickets } from '../../services/ticketService';
import { useAuth } from '../../context/AuthContext';
import './tickets.css';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listTickets();
      setTickets(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const title = useMemo(() => {
    if (user?.role === 'CUSTOMER') return 'My Support Tickets';
    if (user?.role === 'SUPPORT') return 'My Assigned Tickets';
    return 'Ticket Inbox';
  }, [user?.role]);

  const prioClass = (p) => {
    if (p === 'HIGH') return 't-badge--prioHigh';
    if (p === 'MEDIUM') return 't-badge--prioMed';
    return 't-badge--prioLow';
  };

  return (
    <div className="t-page">
      <div className="t-container">
        <div className="t-top">
          <h2 className="t-title">{title}</h2>

          {user?.role === 'CUSTOMER' ? (
            <Link to="/tickets/new">
              <button className="t-btn t-btn--primary">Create ticket</button>
            </Link>
          ) : null}
        </div>

        {error ? <div className="t-alert t-alert--error">{error}</div> : null}
        {loading ? <div className="t-alert">Loading...</div> : null}

        <div className="t-list">
          {tickets.map((t) => {
            const closed = t.status === 'CLOSED';
            return (
              <Link key={t.id} to={`/tickets/${t.id}`} className="t-ticket">
                <div className="t-ticketTop">
                  <div>
                    <div className="t-subject" style={{ fontSize: 16, margin: 0 }}>
                      {t.subject}
                    </div>
                    <div className="t-ticketMeta">
                      Created by: {t.createdBy?.email || '—'} <br />
                      Assigned: {t.assignedTo?.email || 'Unassigned'}
                    </div>
                  </div>

                  <div className="t-badges">
                    <span className={`t-badge ${closed ? 't-badge--closed' : 't-badge--status'}`}>
                      {t.status}
                    </span>
                    <span className={`t-badge ${prioClass(t.priority)}`}>
                      {t.priority || '—'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {!loading && tickets.length === 0 ? (
            <div className="t-card">
              <div className="t-alert">No tickets yet.</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
