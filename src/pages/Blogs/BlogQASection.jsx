import { useEffect, useState } from 'react';
import {
  askQuestion,
  getQuestions,
  upvoteQuestion,
  editQuestion,
  deleteQuestion,
  answerQuestion,
  editAnswer,
  deleteAnswer,
} from '../../services/blogQAService';
import { useAuth } from '../../context/AuthContext';
import './styles/blogQA.css';

function formatDate(dateValue) {
  if (!dateValue) return '';
  return new Date(dateValue).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogQASection({ blogId }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const isMember = user?.role === 'MEMBER';
  const canAnswer = isAdmin || isMember;

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [form, setForm] = useState({ name: '', email: '', question: '' });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ email: '', question: '' });

  const [answerInputs, setAnswerInputs] = useState({});
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedAnswerText, setEditedAnswerText] = useState('');

  const [submitLoading, setSubmitLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [answerLoadingId, setAnswerLoadingId] = useState(null);
  const [editAnswerLoadingId, setEditAnswerLoadingId] = useState(null);
  const [deleteAnswerLoadingId, setDeleteAnswerLoadingId] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);
      setErrorMessage('');
      const res = await getQuestions(blogId);
      setQuestions(res.questions || []);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to load questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (blogId) fetchQuestions();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await askQuestion(blogId, form);
      setSuccessMessage(
        res.message ||
          "Your question has been submitted! We'll notify you by email once it's answered."
      );
      setForm({ name: '', email: '', question: '' });
      await fetchQuestions();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to submit question.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpvote = async (questionId) => {
    try {
      await upvoteQuestion(blogId, questionId);
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, upvotes: (q.upvotes || 0) + 1 } : q
        )
      );
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to upvote question.');
    }
  };

  const startEdit = (question) => {
    setEditingId(question.id);
    setEditForm({ email: '', question: question.question || '' });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ email: '', question: '' });
  };

  const handleEditQuestion = async (questionId) => {
    setActionLoadingId(questionId);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await editQuestion(blogId, questionId, editForm);
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, ...res.question } : q))
      );
      setSuccessMessage(res.message || 'Question updated successfully.');
      cancelEdit();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update question.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // ─── CHANGE 1: Admin skips email prompt; public users must verify email ───
  const handleDeleteQuestion = async (questionId) => {
    if (isAdmin) {
      if (!window.confirm('Are you sure you want to delete this question?')) return;

      setActionLoadingId(questionId);
      setSuccessMessage('');
      setErrorMessage('');

      try {
        const res = await deleteQuestion(blogId, questionId, { isAdmin: true });
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
        setSuccessMessage(res.message || 'Question deleted successfully.');
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Failed to delete question.');
      } finally {
        setActionLoadingId(null);
      }
      return;
    }

    // Public: email-verified flow
    const email = window.prompt('Enter the same email used to submit this question:');
    if (!email) return;
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    setActionLoadingId(questionId);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await deleteQuestion(blogId, questionId, { email });
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      setSuccessMessage(res.message || 'Question deleted successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to delete question.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleAnswerInputChange = (questionId, value) => {
    setAnswerInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAnswerQuestion = async (questionId) => {
    const answer = answerInputs[questionId]?.trim();
    if (!answer) return;

    setAnswerLoadingId(questionId);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await answerQuestion(blogId, questionId, { answer });

      const createdAnswer =
        res.answer ||
        res.data?.answer || {
          id: Date.now(),
          answer,
          createdAt: new Date().toISOString(),
          answeredBy: { role: user?.role || 'TEAM' },
        };

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, isAnswered: true, answers: [...(q.answers || []), createdAnswer] }
            : q
        )
      );

      setAnswerInputs((prev) => ({ ...prev, [questionId]: '' }));
      setSuccessMessage(res.message || 'Answer submitted successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to submit answer.');
    } finally {
      setAnswerLoadingId(null);
    }
  };

  const startEditAnswer = (answer) => {
    setEditingAnswerId(answer.id);
    setEditedAnswerText(answer.answer || '');
    setSuccessMessage('');
    setErrorMessage('');
  };

  const cancelEditAnswer = () => {
    setEditingAnswerId(null);
    setEditedAnswerText('');
  };

  const handleEditAnswer = async (questionId, answerId) => {
    const answer = editedAnswerText.trim();
    if (!answer) return;

    setEditAnswerLoadingId(answerId);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await editAnswer(blogId, questionId, answerId, { answer });
      const updatedAnswer = res.answer || res.data?.answer || { id: answerId, answer };

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: (q.answers || []).map((item) =>
                  item.id === answerId ? { ...item, ...updatedAnswer } : item
                ),
              }
            : q
        )
      );

      setSuccessMessage(res.message || 'Answer updated successfully.');
      cancelEditAnswer();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update answer.');
    } finally {
      setEditAnswerLoadingId(null);
    }
  };

  const handleDeleteAnswer = async (questionId, answerId) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) return;

    setDeleteAnswerLoadingId(answerId);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await deleteAnswer(blogId, questionId, answerId);

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, answers: (q.answers || []).filter((item) => item.id !== answerId) }
            : q
        )
      );

      if (editingAnswerId === answerId) cancelEditAnswer();
      setSuccessMessage(res.message || 'Answer deleted successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to delete answer.');
    } finally {
      setDeleteAnswerLoadingId(null);
    }
  };

  return (
    <section className="blog-qa-section">
      <div className="blog-qa-header">
        <span className="blog-qa-kicker">Community</span>
        <h2>Questions &amp; Answers</h2>
        <p>Have a question about this article? Ask below and our team will get back to you.</p>
      </div>

      <form className="blog-qa-form" onSubmit={handleAskQuestion}>
        <h3>Ask a Question</h3>

        <div className="blog-qa-grid">
          <div className="blog-qa-field">
            <label htmlFor="qa-name">Your Name</label>
            <input
              id="qa-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="blog-qa-field">
            <label htmlFor="qa-email">Email</label>
            <input
              id="qa-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="blog-qa-field">
          <label htmlFor="qa-question">Your Question</label>
          <textarea
            id="qa-question"
            name="question"
            rows="5"
            value={form.question}
            onChange={handleChange}
            placeholder="Write your question here..."
            required
          />
        </div>

        {successMessage ? <p className="blog-qa-success">{successMessage}</p> : null}
        {errorMessage ? <p className="blog-qa-error">{errorMessage}</p> : null}

        <button type="submit" className="blog-qa-btn" disabled={submitLoading}>
          {submitLoading ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>

      <div className="blog-qa-list">
        <div className="blog-qa-list-head">
          <h3>
            {loadingQuestions
              ? 'Loading questions...'
              : `${questions.length} Question${questions.length !== 1 ? 's' : ''}`}
          </h3>
        </div>

        {!loadingQuestions && questions.length === 0 ? (
          <div className="blog-qa-empty">No questions yet be the first to ask.</div>
        ) : null}

        {questions.map((q) => (
          <article key={q.id} id={`question-${q.id}`} className="blog-qa-card">
            <div className="blog-qa-question-row">
              <div className="blog-qa-badge">Q</div>

              <div className="blog-qa-content">
                <div className="blog-qa-meta">
                  <strong>{q.name || 'Anonymous'}</strong>
                  <span>{formatDate(q.createdAt)}</span>
                  {q.isPinned ? <span className="qa-pill pinned">Pinned</span> : null}
                  {q.isAnswered ? <span className="qa-pill answered">Answered</span> : null}
                </div>

                {editingId === q.id ? (
                  <div className="blog-qa-edit-box">
                    <input
                      type="email"
                      placeholder="Enter your email to verify"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                    <textarea
                      rows="4"
                      value={editForm.question}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, question: e.target.value }))
                      }
                    />
                    <div className="blog-qa-actions">
                      <button
                        type="button"
                        className="blog-qa-btn small"
                        onClick={() => handleEditQuestion(q.id)}
                        disabled={actionLoadingId === q.id}
                      >
                        {actionLoadingId === q.id ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="blog-qa-btn secondary small"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="blog-qa-question-text">{q.question}</p>

                    {/* ─── CHANGE 2: Question action buttons by role ─── */}
                    <div className="blog-qa-actions">
                      <button
                        type="button"
                        className="blog-qa-link-btn"
                        onClick={() => handleUpvote(q.id)}
                      >
                        Upvote ({q.upvotes || 0})
                      </button>

                      {!isAdmin && !isMember ? (
                        <>
                          <button
                            type="button"
                            className="blog-qa-link-btn"
                            onClick={() => startEdit(q)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="blog-qa-link-btn danger"
                            onClick={() => handleDeleteQuestion(q.id)}
                            disabled={actionLoadingId === q.id}
                          >
                            {actionLoadingId === q.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </>
                      ) : isAdmin ? (
                        <button
                          type="button"
                          className="blog-qa-link-btn danger"
                          onClick={() => handleDeleteQuestion(q.id)}
                          disabled={actionLoadingId === q.id}
                        >
                          {actionLoadingId === q.id ? 'Deleting...' : 'Delete Question'}
                        </button>
                      ) : null}
                    </div>
                  </>
                )}

                {q.answers?.length ? (
                  <div className="blog-qa-answer-list">
                    {q.answers.map((answer) => (
                      <div key={answer.id} className="blog-qa-answer">
                        <div className="blog-qa-answer-badge">A</div>

                        <div className="blog-qa-answer-body">
                          {editingAnswerId === answer.id ? (
                            <div className="blog-qa-edit-box">
                              <textarea
                                rows="4"
                                value={editedAnswerText}
                                onChange={(e) => setEditedAnswerText(e.target.value)}
                              />
                              <div className="blog-qa-actions">
                                <button
                                  type="button"
                                  className="blog-qa-btn small"
                                  onClick={() => handleEditAnswer(q.id, answer.id)}
                                  disabled={editAnswerLoadingId === answer.id}
                                >
                                  {editAnswerLoadingId === answer.id ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                  type="button"
                                  className="blog-qa-btn secondary small"
                                  onClick={cancelEditAnswer}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p>{answer.answer}</p>
                              <div className="blog-qa-meta">
                                <strong>{answer.answeredBy?.role || 'Team'}</strong>
                                <span>{formatDate(answer.createdAt)}</span>
                              </div>

                              {/* ─── CHANGE 3: Answer edit/delete for canAnswer (admin + member) ─── */}
                              {canAnswer ? (
                                <div className="blog-qa-actions">
                                  <button
                                    type="button"
                                    className="blog-qa-link-btn"
                                    onClick={() => startEditAnswer(answer)}
                                  >
                                    Edit Answer
                                  </button>
                                  <button
                                    type="button"
                                    className="blog-qa-link-btn danger"
                                    onClick={() => handleDeleteAnswer(q.id, answer.id)}
                                    disabled={deleteAnswerLoadingId === answer.id}
                                  >
                                    {deleteAnswerLoadingId === answer.id
                                      ? 'Deleting...'
                                      : 'Delete Answer'}
                                  </button>
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {canAnswer ? (
                  <div className="blog-qa-inline-answer">
                    <label className="blog-qa-inline-answer__label">
                      Answer this question
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Write your answer here..."
                      value={answerInputs[q.id] || ''}
                      onChange={(e) => handleAnswerInputChange(q.id, e.target.value)}
                    />
                    <div className="blog-qa-actions">
                      <button
                        type="button"
                        className="blog-qa-btn small"
                        onClick={() => handleAnswerQuestion(q.id)}
                        disabled={answerLoadingId === q.id}
                      >
                        {answerLoadingId === q.id ? 'Submitting...' : 'Submit Answer'}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}