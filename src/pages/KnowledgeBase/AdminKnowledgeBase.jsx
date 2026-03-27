import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  getAllArticlesAdmin,
  getCategories,
  createArticle,
  updateArticle,
  deleteArticle,
  createCategory,
  deleteCategory,
} from '../../services/knowledgeBaseService';
import './kb.css';

export default function AdminKnowledgeBase() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('DRAFT');

  const [catName, setCatName] = useState('');

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const categoriesById = useMemo(() => {
    const m = new Map();
    categories.forEach((c) => m.set(c.id, c));
    return m;
  }, [categories]);

  const load = useCallback(async () => {
  setLoading(true);
  setError('');
  try {
    const [a, c] = await Promise.all([
      getAllArticlesAdmin(),
      getCategories(),
    ]);

    setArticles(a);
    setCategories(c);

    if (!categoryId && c[0]?.id) {
      setCategoryId(c[0].id);
    }
  } catch (e) {
    setError(
      e?.response?.data?.message ||
      'Failed to load admin knowledge base'
    );
  } finally {
    setLoading(false);
  }
}, [categoryId]);


useEffect(() => {
  load();
}, [load]);

  const resetArticleForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setStatus('DRAFT');
  };

  const onSubmitArticle = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const payload = { title, content, categoryId, status };
      if (editingId) {
        const data = await updateArticle(editingId, payload);
        setMsg(data?.message || 'Article updated');
      } else {
        const data = await createArticle(payload);
        setMsg(data?.message || 'Article created');
      }
      resetArticleForm();
      await load();
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (a) => {
    setMsg('');
    setError('');
    setEditingId(a.id);
    setTitle(a.title || '');
    setContent(a.content || '');
    setStatus(a.status || 'DRAFT');
    setCategoryId(a.categoryId || a.category?.id || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDeleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await deleteArticle(id);
      setMsg(data?.message || 'Article deleted');
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const onCreateCategory = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await createCategory({ name: catName });
      setMsg(data?.message || 'Category created');
      setCatName('');
      await load();
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Category create failed');
    } finally {
      setBusy(false);
    }
  };

  const onDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    setMsg('');
    setError('');
    setBusy(true);
    try {
      const data = await deleteCategory(id);
      setMsg(data?.message || 'Category deleted');
      await load();
    } catch (e2) {
      setError(e2?.response?.data?.message || 'Category delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="kb-page">
      <div className="kb-container">
        <div className="kb-topbar">
          <div>
            <h2 className="kb-title">Admin Knowledge Base</h2>
            <p className="kb-subtitle">Create categories, write articles, and publish when ready.</p>
          </div>
          <div className="kb-row" style={{ justifyContent: 'flex-end' }}>
            <button className="kb-btn" onClick={load} disabled={busy}>
              Refresh
            </button>
          </div>
        </div>

        {msg ? <div className="kb-alert kb-alert--success">{msg}</div> : null}
        {error ? <div className="kb-alert kb-alert--error">{error}</div> : null}
        {loading ? <div className="kb-alert">Loading...</div> : null}

        <div className="kb-grid">
          {/* Article form */}
          <section className="kb-card">
            <h3>{editingId ? 'Edit article' : 'Create article'}</h3>

            <form onSubmit={onSubmitArticle} className="kb-form">
              <div>
                <div className="kb-label">Title</div>
                <input
                  className="kb-input"
                  placeholder="Article title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>

              <div>
                <div className="kb-label">Content</div>
                <textarea
                  className="kb-textarea"
                  placeholder="Write your content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>

              <div className="kb-row">
                <div>
                  <div className="kb-label">Category</div>
                  <select
                    className="kb-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    disabled={busy}
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="kb-label">Status</div>
                  <select
                    className="kb-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={busy}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                </div>
              </div>

              <div className="kb-actions">
                <button className="kb-btn kb-btn--primary" type="submit" disabled={busy}>
                  {editingId ? 'Update' : 'Create'}
                </button>
                {editingId ? (
                  <button className="kb-btn" type="button" onClick={resetArticleForm} disabled={busy}>
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          {/* Categories */}
          <section className="kb-card">
            <h3>Categories</h3>

            <form onSubmit={onCreateCategory} className="kb-form">
              <div>
                <div className="kb-label">New category</div>
                <input
                  className="kb-input"
                  placeholder="e.g. Getting Started"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                  disabled={busy}
                />
              </div>

              <div className="kb-actions">
                <button className="kb-btn kb-btn--primary" type="submit" disabled={busy}>
                  Add
                </button>
              </div>
            </form>

            <div className="kb-list">
              {categories.map((c) => (
                <div key={c.id} className="kb-item">
                  <div className="kb-item-title">
                    <strong>{c.name}</strong>
                    <button className="kb-btn kb-btn--danger" onClick={() => onDeleteCategory(c.id)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {categories.length === 0 ? (
                <div className="kb-alert">No categories yet. Create one to start adding articles.</div>
              ) : null}
            </div>
          </section>
        </div>

        {/* Articles list */}
        <section className="kb-card" style={{ marginTop: 14 }}>
          <h3>All articles (draft + published)</h3>

          <div className="kb-list">
            {articles.map((a) => (
              <div key={a.id} className="kb-item">
                <div className="kb-item-title">
                  <div>
                    <strong>{a.title}</strong>
                    <div className="kb-meta">
                      Status: {a.status} | Category: {a.category?.name || categoriesById.get(a.categoryId)?.name || '—'}
                    </div>
                  </div>

                  <div className="kb-row" style={{ justifyContent: 'flex-end' }}>
                    <button className="kb-btn" onClick={() => onEdit(a)} disabled={busy}>
                      Edit
                    </button>
                    <button className="kb-btn kb-btn--danger" onClick={() => onDeleteArticle(a.id)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                </div>

                <p className="kb-preview">
                  {a.content?.slice(0, 240)}
                  {a.content?.length > 240 ? '...' : ''}
                </p>
              </div>
            ))}

            {articles.length === 0 && !loading ? (
              <div className="kb-alert">No articles yet. Create your first article above.</div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
