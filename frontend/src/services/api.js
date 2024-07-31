// frontend/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const createAgent = async (agentData) => {
  const response = await axios.post(`${API_URL}/workspace/create-agent`, agentData);
  return response.data;
};

export const getWorkspace = async () => {
  const response = await axios.get(`${API_URL}/workspace`);
  const workspace = response.data;
  workspace.blocks = workspace.blocks.map(block => ({
    ...block,
    content: block.content || {}  // Ensure content is always an object
  }));
  return workspace;
};

export const updateWorkspace = async (blocks) => {
  const response = await axios.put(`${API_URL}/workspace`, { blocks });
  return response.data;
};

export const clearWorkspace = async () => {
  const response = await axios.post(`${API_URL}/workspace/clear`);
  return response.data;
};