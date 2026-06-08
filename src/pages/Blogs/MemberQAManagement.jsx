import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getUnansweredQuestions,
  answerQuestion,
  editAnswer,
  deleteAnswer,
} from '../../services/blogQAService';
import './styles/memberQA.css';

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function MemberQAManagement() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [answerInputs, setAnswerInputs] = useState({});
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedAnswerText, setEditedAnswerText] = useState('');

  const [submitLoadingId, setSubmitLoadingId] = useState(null);
  const [editLoadingId, setEditLoadingId] = useState(null);
  const [deleteAnswerLoadingId, setDeleteAnswerLoadingId] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const res = await getUnansweredQuestions('all');
      setQuestions(res.questions || []);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswerInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAnswer = async (q) => {
    const answer = answerInputs[q.id]?.trim();
    if (!answer) return;

    setSubmitLoadingId(q.id);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const blogId = q.blog?.id || q.blogId;
      const res = await answerQuestion(blogId, q.id, { answer });

      const newAnswer =
        res.answer ||
        res.data?.answer || {
          id: Date.now(),
          answer,
          createdAt: new Date().toISOString(),
        };

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? { ...item, answers: [...(item.answers || []), newAnswer] }
            : item
        )
      );

      setAnswerInputs((prev) => ({ ...prev, [q.id]: '' }));
      setSuccessMessage('Answer submitted successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitLoadingId(null);
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

  const handleEditAnswer = async (q, ans) => {
    const updatedText = editedAnswerText.trim();
    if (!updatedText) return;

    setEditLoadingId(ans.id);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const blogId = q.blog?.id || q.blogId;
      const res = await editAnswer(blogId, q.id, ans.id, { answer: updatedText });

      const updatedAnswer =
        res.answer || res.data?.answer || { ...ans, answer: updatedText };

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? {
                ...item,
                answers: (item.answers || []).map((a) =>
                  a.id === ans.id ? { ...a, ...updatedAnswer } : a
                ),
              }
            : item
        )
      );

      cancelEditAnswer();
      setSuccessMessage('Answer updated successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update answer');
    } finally {
      setEditLoadingId(null);
    }
  };

  const handleDeleteAnswer = async (q, ans) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) return;

    setDeleteAnswerLoadingId(ans.id);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const blogId = q.blog?.id || q.blogId;
      await deleteAnswer(blogId, q.id, ans.id);

      setQuestions((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? {
                ...item,
                answers: (item.answers || []).filter((a) => a.id !== ans.id),
              }
            : item
        )
      );

      if (editingAnswerId === ans.id) cancelEditAnswer();
      setSuccessMessage('Answer deleted successfully.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to delete answer');
    } finally {
      setDeleteAnswerLoadingId(null);
    }
  };

  return (
    <section className="member-qa-management">
      <div className="member-qa-management__container">
        <div className="member-qa-management__header">
          <div>
            <p className="member-qa-management__eyebrow">Member Panel</p>
            <h1>Blog Q&amp;A</h1>
            <p className="member-qa-management__description">
              Answer reader questions on your blog posts and manage your existing answers.
            </p>
          </div>
        </div>

        {errorMessage ? (
          <div className="member-qa-management__error">{errorMessage}</div>
        ) : null}

        {successMessage ? (
          <div className="member-qa-management__success">{successMessage}</div>
        ) : null}

        {loading ? (
          <div className="member-qa-management__empty">Loading questions...</div>
        ) : questions.length === 0 ? (
          <div className="member-qa-management__empty">
            No unanswered questions right now.
          </div>
        ) : (
          <div className="member-qa-list">
            {questions.map((q) => (
              <article key={q.id} className="member-qa-card">
                <div className="member-qa-card__top">
                  <div>
                    {q.blog?.slug ? (
                      <Link
                        to={`/blogs/${q.blog.slug}#question-${q.id}`}
                        className="member-qa-card__blog member-qa-card__blog-link"
                      >
                        {q.blog?.title || 'Blog'}
                      </Link>
                    ) : (
                      <p className="member-qa-card__blog">{q.blog?.title || 'Blog'}</p>
                    )}

                    <h3>{q.question}</h3>

                    <p className="member-qa-card__meta">
                      <strong>{q.name || 'Anonymous'}</strong> ·{' '}
                      {formatDate(q.createdAt)} · Upvotes: {q.upvotes || 0}
                    </p>
                  </div>
                </div>

                <textarea
                  className="member-qa-card__textarea"
                  rows="5"
                  placeholder="Write your answer..."
                  value={answerInputs[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />

                <div className="member-qa-card__actions">
                  <button
                    type="button"
                    className="member-qa-management__btn member-qa-management__btn--primary"
                    onClick={() => handleAnswer(q)}
                    disabled={submitLoadingId === q.id}
                  >
                    {submitLoadingId === q.id ? 'Submitting...' : 'Submit Answer'}
                  </button>
                </div>

                {q.answers?.length ? (
                  <div className="member-qa-card__answers">
                    {q.answers.map((ans) => (
                      <div key={ans.id} className="member-qa-card__answer">
                        {editingAnswerId === ans.id ? (
                          <>
                            <textarea
                              className="member-qa-card__textarea"
                              rows="4"
                              value={editedAnswerText}
                              onChange={(e) => setEditedAnswerText(e.target.value)}
                            />
                            <div className="member-qa-card__actions">
                              <button
                                type="button"
                                className="member-qa-management__btn member-qa-management__btn--primary"
                                onClick={() => handleEditAnswer(q, ans)}
                                disabled={editLoadingId === ans.id}
                              >
                                {editLoadingId === ans.id ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                type="button"
                                className="member-qa-management__btn"
                                onClick={cancelEditAnswer}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>{ans.answer}</p>
                            <span>{formatDate(ans.createdAt)}</span>
                            <div
                              className="member-qa-card__actions"
                              style={{ marginTop: '10px' }}
                            >
                              <button
                                type="button"
                                className="member-qa-management__btn"
                                onClick={() => startEditAnswer(ans)}
                              >
                                Edit Answer
                              </button>
                              <button
                                type="button"
                                className="member-qa-management__btn delete-btn"
                                onClick={() => handleDeleteAnswer(q, ans)}
                                disabled={deleteAnswerLoadingId === ans.id}
                              >
                                {deleteAnswerLoadingId === ans.id
                                  ? 'Deleting...'
                                  : 'Delete Answer'}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}