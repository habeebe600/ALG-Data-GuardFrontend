import api from './api';

export const getMyProfile = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const updateMyProfile = async (payload) => {
  const res = await api.put('/auth/profile', payload);
  return res.data;
};