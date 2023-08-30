import axios from 'axios';

export const api = axios.create({
  withCredentials: true,
  credentials: 'include',
  baseURL: process.env.REACT_APP_API_URL,
});

export const getByTerm = async (terms) => api.get(`/api/search?search=${terms}`);
export const getAllSearch = async () => api.get(`/api/search?search=${terms}`);
