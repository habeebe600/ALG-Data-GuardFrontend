import api from './api';

export const createTicket = async (payload) => {
  // payload: { subject, message, priority }
  const res = await api.post('/tickets', payload);
  return res.data; // { message, ticket }
};

export const listTickets = async () => {
  const res = await api.get('/tickets');
  return res.data; // Ticket[]
};

export const replyTicket = async (id, payload) => {
  // payload: { message }
  const res = await api.post(`/tickets/${id}/reply`, payload);
  return res.data; // { message, reply }
};

export const assignTicket = async (id, payload) => {
  // payload: { supportUserId }
  const res = await api.patch(`/tickets/${id}/assign`, payload);
  return res.data; // { message, ticket }
};

export const updateTicketStatus = async (id, payload) => {
  // payload: { status }
  const res = await api.patch(`/tickets/${id}/status`, payload);
  return res.data; // { message, ticket }
};

export const getTicketThread = async (id) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data; // ticket with messages
};
