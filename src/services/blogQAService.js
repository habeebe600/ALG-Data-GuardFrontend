import api from './api';

// Public — get all questions for a blog
export const getQuestions = async (blogId) => {
  const res = await api.get(`/blogs/${blogId}/questions`);
  return res.data;
};

// Public — submit a question on a blog
export const askQuestion = async (blogId, payload) => {
  const res = await api.post(`/blogs/${blogId}/questions`, payload);
  return res.data;
};

// Public — upvote a specific question
export const upvoteQuestion = async (blogId, questionId) => {
  const res = await api.post(`/blogs/${blogId}/questions/${questionId}/upvote`);
  return res.data;
};

// Public — edit a previously submitted question
export const editQuestion = async (blogId, questionId, payload) => {
  const res = await api.patch(`/blogs/${blogId}/questions/${questionId}`, payload);
  return res.data;
};

// Public or Admin — delete question
export const deleteQuestion = async (blogId, questionId, payload = {}) => {
  const { isAdmin, email } = payload;

  const url = isAdmin
    ? `/blogs/${blogId}/questions/${questionId}/admin`
    : `/blogs/${blogId}/questions/${questionId}`;

  const config = !isAdmin
    ? { data: { email } }
    : {};

  const res = await api.delete(url, config);
  return res.data;
};

// Member/Admin — submit an answer to a question
export const answerQuestion = async (blogId, questionId, payload) => {
  const res = await api.post(`/blogs/${blogId}/questions/${questionId}/answers`, payload);
  return res.data;
};

// Member/Admin — edit an existing answer
export const editAnswer = async (blogId, questionId, answerId, payload) => {
  const res = await api.patch(
    `/blogs/${blogId}/questions/${questionId}/answers/${answerId}`,
    payload
  );
  return res.data;
};

// Member/Admin — delete an existing answer
export const deleteAnswer = async (blogId, questionId, answerId) => {
  const res = await api.delete(
    `/blogs/${blogId}/questions/${questionId}/answers/${answerId}`
  );
  return res.data;
};

// Admin — pin or unpin a question
export const pinQuestion = async (blogId, questionId) => {
  const res = await api.patch(`/blogs/${blogId}/questions/${questionId}/pin`);
  return res.data;
};

// Member/Admin — get unanswered questions for a blog
export const getUnansweredQuestions = async (blogId) => {
  const res = await api.get(`/blogs/${blogId}/questions/filter/unanswered`);
  return res.data;
};