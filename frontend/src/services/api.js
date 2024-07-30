// src/services/api.js
import axios from 'axios';

// const API_URL = 'http://localhost:3001/api';

export const saveWorkspace = async (blocks) => {
  const response = await axios.post(`api/workspace`, { blocks });
  return response.data;
};

export const getWorkspace = async () => {
  const response = await axios.get(`api/workspace`);
  return response.data;
};