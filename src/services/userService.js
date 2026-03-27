import api from './api';

export const getAllUsers = async (role) => {
  const res = await api.get('/users', { params: role ? { role } : {} });
  return res.data; // users[]
};

export const getSupportUsers = async () => {
  const res = await api.get('/users/support');
  return res.data; // [{ id, email, createdAt }]
};

export const setUserBlocked = async (id, isBlocked) => {
  const res = await api.patch(`/users/${id}/block`, { isBlocked });
  return res.data;
};