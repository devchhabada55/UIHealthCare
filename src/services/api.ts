import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getPDFs = async () => {
  const response = await api.get('/pdfs');
  return response.data;
};

export const deletePDF = async (id: string) => {
  const response = await api.delete(`/pdfs/${id}`);
  return response.data;
};

export const analyzePDFs = async (pdfIds: string[], healthType: string) => {
  const response = await api.post('/analyze-pdfs', { pdfIds, healthType });
  return response.data;
};

export const getHealthData = async () => {
  const response = await api.get('/health-data');
  return response.data;
};

export const downloadPDF = async (id: string) => {
  const response = await api.get(`/pdfs/${id}/download`, {
    responseType: 'blob',
  });
  return response.data;
};

export const deleteAllPDFs = async () => {
  const response = await api.delete('/pdfs');
  return response.data;
};

export const addHealthData = async (data: any) => {
  try {
    const response = await api.post('/health-data', data);
    return response.data;
  } catch (error) {
    console.error('Error adding health data:', error);
    throw error;
  }
};

export const updateHealthData = async (id: string, data: any) => {
  try {
    const response = await api.put(`/health-data/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating health data:', error);
    throw error;
  }
};

export const deleteHealthData = async (id: string) => {
  try {
    const response = await api.delete(`/health-data/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting health data:', error);
    throw error;
  }
};

export const getAnalysis = async (patientId: string, type: string) => {
  try {
    const response = await api.get(`/analysis/${patientId}/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
};

export default api; 