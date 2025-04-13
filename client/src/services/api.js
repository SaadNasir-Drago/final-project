import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://final-project-main-geww5u.laravel.cloud/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle 422 Validation Errors
    if (error.response?.status === 422) {
      const firstError = Object.values(error.response.data.errors)[0][0];
      throw new Error(firstError);
    }
    
    const message = 
      error.response?.data?.message || 
      error.message || 
      'Something went wrong';
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    throw new Error(message);
  }
);

// Auth services
export const loginUser = (credentials) => {
  return api.post('/login', credentials);
};

export const registerUser = (userData) => {
  return api.post('/register', userData);
};

export const getCurrentUser = () => {
  return api.get('/profile');
};

export const logoutUser = () => {
  return api.post('/logout');
};

export default api;
