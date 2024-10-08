import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'https://crm-be-jub8.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add a request interceptor to set the auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;