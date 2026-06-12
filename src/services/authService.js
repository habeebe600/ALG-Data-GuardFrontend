// src/services/authService.js
import api from './api';

export const registerUser = async (payload) => {
  // payload: { email, password, businessName, phone? }
  const res = await api.post('/auth/register', payload);
  return res.data; // { message }
};

export const verifyAccountOtp = async (payload) => {
  // payload: { email, otp }
  const res = await api.post('/auth/verify', payload);
  return res.data; // { message }
};

export const loginUser = async (credentials) => {
  // credentials: { email, password }
  const res = await api.post('/auth/login', credentials);
  return res.data; // { token, user }
};

export const forgotPassword = async (payload) => {
  // payload: { email }
  const res = await api.post('/auth/forgot-password', payload);
  return res.data; // { message }
};

export const resetPassword = async (payload) => {
  // payload: { email, otp, newPassword }
  const res = await api.post('/auth/reset-password', payload);
  return res.data; // { message }
};

export const logoutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data; // { message }
};

export const createStaffUser = async (payload) => {
  // payload: { email, password, role: "SUPPORT" | "ADMIN_SUPPORT" }
  const res = await api.post('/auth/create-staff', payload);
  return res.data; // { message, user }
};

export const resendOtp = async (email) => {
  const res = await api.post('/auth/resend-otp', { email });
  return res.data;
};

export const resendResetOtp = async (email) => {
  const res = await api.post('/auth/resend-reset-otp', { email });
  return res.data;
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await api.put('/auth/change-password', { currentPassword, newPassword });
  return res.data;
};