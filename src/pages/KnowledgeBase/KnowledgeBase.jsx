import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getPublishedArticles, searchArticles } from '../../services/knowledgeBaseService';
import './kbPublic.css';


export default function KnowledgeBase() {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(''); // '' = All
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredArticles = useMemo(() => {
    if (!activeCategoryId) return articles;
    return articles.filter((a) => a.categoryId === activeCategoryId || a.category?.id === activeCategoryId);
  }, [articles, activeCategoryId]);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cats, arts] = await Promise.all([getCategories(), getPublishedArticles()]);
      setCategories(cats);
      setArticles(arts);
      setActiveCategoryId('');
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load knowledge base');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const query = q.trim();
      if (query.length < 2) {
        await load();
        return;
      }
      const results = await searchArticles(query);
      setArticles(results);
      setActiveCategoryId('');
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kbp-page">
      <div className="kbp-container">
        <div className="kbp-header">
          <div>
            <h2 className="kbp-title">Knowledge Base</h2>
            <p className="kbp-subtitle">Search answers and browse published articles.</p>
          </div>
        </div>

        <div className="kbp-card">
          <form onSubmit={onSearch} className="kbp-search">
            <input
              className="kbp-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
            />
            <button className="kbp-btn kbp-btn--primary" type="submit" disabled={loading}>
              Search
            </button>
            <button
              className="kbp-btn"
              type="button"
              disabled={loading}
              onClick={() => {
                setQ('');
                load();
              }}
            >
              Reset
            </button>
          </form>

          {error ? <div className="kbp-alert kbp-alert--error">{error}</div> : null}
          {loading ? <div className="kbp-alert">Loading...</div> : null}

          <div className="kbp-pills">
            <button
              type="button"
              className="kbp-pill"
              style={{
                cursor: 'pointer',
                opacity: activeCategoryId ? 0.8 : 1,
                border: !activeCategoryId ? '1px solid rgba(249,115,22,.45)' : undefined
              }}
              onClick={() => setActiveCategoryId('')}
              disabled={loading}
            >
              All
            </button>

            {categories.length ? (
              categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="kbp-pill"
                  style={{
                    cursor: 'pointer',
                    opacity: activeCategoryId && activeCategoryId !== c.id ? 0.75 : 1,
                    border: activeCategoryId === c.id ? '1px solid rgba(249,115,22,.45)' : undefined
                  }}
                  onClick={() => setActiveCategoryId(c.id)}
                  disabled={loading}
                >
                  {c.name}
                </button>
              ))
            ) : (
              <span className="kbp-pill">No categories yet</span>
            )}
          </div>

        </div>

        <div className="kbp-list">
          {filteredArticles.map((a) => (
            <article key={a.id} className="kbp-article">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0 }}>{a.title}</h3>

                <Link to={`/knowledge-base/${a.id}`} className="kbp-link" style={{ textDecoration: 'none' }}>
                  Open
                </Link>
              </div>

              <div className="kbp-meta">
                {a.category?.name ? `Category: ${a.category.name}` : 'Category: —'}
              </div>

              <div className="kbp-content">
                {a.content?.slice(0, 350)}
                {a.content?.length > 350 ? '...' : ''}
              </div>
            </article>
          ))}

          {!loading && !error && filteredArticles.length === 0 ? (
            <div className="kbp-card">
              <div className="kbp-alert">No published articles yet.</div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
