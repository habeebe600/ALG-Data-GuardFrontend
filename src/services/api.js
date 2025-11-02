// src/services/api.js
import axios from 'axios';

// Automatically detect environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Use environment variable first, then auto-detect based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isDevelopment 
    ? 'http://localhost:5000' 
    : 'https://alg-data-guard-backend.vercel.app'
  );

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
