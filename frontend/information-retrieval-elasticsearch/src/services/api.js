import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getByTerm = async (terms) => api.get(`/api/search?search=${terms}`);
export const getAllSearch = async () => api.get(`/api/search`);
