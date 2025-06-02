import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Physical Health API calls
export const uploadPhysicalHealthFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/physical-health', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getPhysicalHealthAnalysis = async () => {
  const response = await api.get('/api/physical-health');
  return response.data;
};

export const getPhysicalHealthHistory = async () => {
  const response = await api.get('/api/physical-health/history');
  return response.data;
};

// Mental Health API calls
export const uploadMentalHealthFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/mental-health', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getMentalHealthAnalysis = async () => {
  const response = await api.get('/api/mental-health');
  return response.data;
};

export const getMentalHealthHistory = async () => {
  const response = await api.get('/api/mental-health/history');
  return response.data;
};

// Sleep API calls
export const uploadSleepFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/sleep', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getSleepAnalysis = async () => {
  const response = await api.get('/api/sleep');
  return response.data;
};

export const getSleepHistory = async () => {
  const response = await api.get('/api/sleep/history');
  return response.data;
};

// Inflammatory Health API calls
export const uploadInflammatoryFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/inflammatory/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getInflammatoryAnalysis = async (fileId: string) => {
  const response = await api.get(`/api/inflammatory/analysis/${fileId}`);
  return response.data;
};

export const getInflammatoryHistory = async () => {
  const response = await api.get('/api/inflammatory/history');
  return response.data;
};

// User API calls
export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

export const updateUserProfile = async (userData: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const response = await api.put('/api/auth/profile', userData);
  return response.data;
};

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data.message || 'An error occurred with the server';
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response received from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'An unexpected error occurred';
  }
};

export default api; 