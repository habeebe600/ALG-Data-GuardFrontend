import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getArticleById } from '../../services/knowledgeBaseService';
import '../Tickets/tickets.css';

export default function KnowledgeBaseArticle() {
  const { id } = useParams();
  const { user, loading } = useAuth();

  const [article, setArticle] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setBusy(true);
      setError('');
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load article');
        setArticle(null);
      } finally {
        setBusy(false);
      }
    };
    run();
  }, [id]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="t-page">
      <div className="t-container" style={{ maxWidth: 900 }}>
        <div className="t-top">
          <h2 className="t-title">Knowledge Base</h2>
          <Link to="/knowledge-base" className="chat-link">
            Back
          </Link>
        </div>

        {error ? <div className="t-alert t-alert--error">{error}</div> : null}
        {busy ? <div className="t-alert">Loading...</div> : null}

        {!busy && article ? (
          <section className="t-card">
            <div className="t-headline">
              <h3 className="t-subject" style={{ marginBottom: 6 }}>
                {article.title}
              </h3>
              <div className="t-meta">
                {article.category?.name ? `Category: ${article.category.name}` : null}
              </div>
            </div>

            {/* If your backend content is plain text, this is safe.
                If it contains HTML, DON'T use dangerouslySetInnerHTML unless you sanitize. */}
            <div className="t-meta" style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
              {article.content}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
