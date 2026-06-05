import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('funzone_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminAuth = {
  login: (credentials) => adminApi.post('/login', credentials),
  me: () => adminApi.get('/me'),
  logout: () => adminApi.post('/logout'),
};

export const adminData = {
  stats: () => adminApi.get('/stats'),
  tables: () => adminApi.get('/tables'),
  tableRows: (table, params) => adminApi.get(`/tables/${table}`, { params }),
  create: (table, payload) => adminApi.post(`/tables/${table}`, payload),
  update: (table, id, payload) => adminApi.put(`/tables/${table}/${id}`, payload),
  destroy: (table, id) => adminApi.delete(`/tables/${table}/${id}`),
};

export default adminApi;
