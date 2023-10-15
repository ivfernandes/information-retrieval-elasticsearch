import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getByTerm = async (terms) => api.get(`/api/search?search=${terms}`);
export const getAllSearch = async () => api.get(`/api/search`);
export const getByTermV2 = async (terms) => api.get(`/api/search/v2?search=${terms}`);
export const getAllSearchV2 = async () => api.get(`/api/search/v2`);
