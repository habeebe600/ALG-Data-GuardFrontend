// src/services/contactAPI.js
import api from './api';

// Submit contact form
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/api/contact', contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Network error' };
  }
};

// Optional: Get all contacts (if you need this later)
export const getAllContacts = async () => {
  try {
    const response = await api.get('/api/contacts');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch contacts' };
  }
};
