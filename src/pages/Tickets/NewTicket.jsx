import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTicket } from '../../services/ticketService';
import './tickets.css';

export default function NewTicket() {
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await createTicket({ subject, priority, message });
      navigate(`/tickets/${data.ticket.id}`);
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="t-page">
      <div className="t-container">
        <div className="t-top">
          <h2 className="t-title">Create ticket</h2>
          <Link to="/tickets" className="chat-link">Back</Link>
        </div>

        {error ? <div className="t-alert t-alert--error">{error}</div> : null}

        <section className="t-card">
          <form onSubmit={onSubmit} className="t-form">
            <div>
              <div className="t-label">Subject</div>
              <input
                className="t-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <div className="t-label">Priority</div>
              <select
                className="t-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={submitting}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <div className="t-label">Message</div>
              <textarea
                className="t-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Describe your issue..."
                required
                disabled={submitting}
              />
            </div>

            <button className="t-btn t-btn--primary" disabled={submitting} type="submit">
              {submitting ? 'Creating...' : 'Create ticket'}
            </button>
          </form>
        </section>

        <div style={{ marginTop: 12 }}>
          <Link to="/tickets" className="chat-link">Back to tickets</Link>
        </div>
      </div>
    </div>
  );
}
