import api from './api';

// Articles (logged-in)
export const getPublishedArticles = async () => (await api.get('/knowledge-base')).data;
export const getArticleById = async (id) =>
  (await api.get(`/knowledge-base/article/${id}`)).data;
export const searchArticles = async (q) =>
  (await api.get('/knowledge-base/search', { params: { q } })).data;

// Articles (admin)
export const getAllArticlesAdmin = async () => (await api.get('/knowledge-base/admin')).data;
export const createArticle = async (payload) => (await api.post('/knowledge-base', payload)).data;
export const updateArticle = async (id, payload) => (await api.put(`/knowledge-base/${id}`, payload)).data;
export const deleteArticle = async (id) => (await api.delete(`/knowledge-base/${id}`)).data;

// Categories (logged-in)
export const getCategories = async () => (await api.get('/knowledge-base/categories')).data;

// Categories (admin)
export const createCategory = async (payload) =>
  (await api.post('/knowledge-base/categories', payload)).data;
export const deleteCategory = async (id) =>
  (await api.delete(`/knowledge-base/categories/${id}`)).data;
