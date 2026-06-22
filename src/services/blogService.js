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

// GET MY BLOGS
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

// GET BY SLUG
export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/blogs/${slug}`);
  return res.data;
};

// UPLOAD COVER IMAGE — returns { success: true, url: "..." }
export const uploadBlogImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/blogs/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};