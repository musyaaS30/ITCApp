import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic Request Interceptor to inject JWT Authorization Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('itc_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional Response Interceptor to handle unauthorized / expired tokens gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('itc_token');
      localStorage.removeItem('itc_user');
      // Redirect to login if user is unauthorized on a protected resource
      if (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/profile') || window.location.pathname.startsWith('/attendance')) {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
