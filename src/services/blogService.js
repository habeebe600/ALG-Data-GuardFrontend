// src/services/blogService.js
import api from "./api";

// CREATE
export const createBlog = async (payload) => {
  const res = await api.post("/blogs", payload);
  return res.data;
};

// GET ALL (with filters)
export const getBlogs = async (params = {}) => {
  const res = await api.get("/blogs", { params });
  return res.data;
};

// GET MY BLOGS (member's own blogs) — filters by authorId on backend via query
export const getMyBlogs = async (params = {}) => {
  const res = await api.get("/blogs/my", { params });
  return res.data;
};

// GET BY ID
export const getBlogById = async (id) => {
  const res = await api.get(`/blogs/id/${id}`);
  return res.data;
};

// UPDATE
export const updateBlog = async (id, payload) => {
  const res = await api.patch(`/blogs/${id}`, payload);
  return res.data;
};

// DELETE
export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/blogs/${slug}`);
  return res.data;
};