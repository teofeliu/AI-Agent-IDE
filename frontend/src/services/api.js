import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const createAgent = async (agentData) => {
  const response = await axios.post(`${API_URL}/workspace/create-agent`, agentData);
  return response.data;
};

export const getWorkspace = async () => {
  const response = await axios.get(`${API_URL}/workspace`);
  return response.data;
};

export const updateWorkspace = async (blocks) => {
  const response = await axios.put(`${API_URL}/workspace`, { blocks });
  return response.data;
};

export const clearWorkspace = async () => {
  const response = await axios.post(`${API_URL}/workspace/clear`);
  return response.data;
};