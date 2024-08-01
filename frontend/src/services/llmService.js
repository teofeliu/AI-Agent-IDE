// frontend/src/services/llmService.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const generateThoughts = async (prompt) => {
  const response = await axios.post(`${API_URL}/llm/generate-thoughts`, { prompt });
  return response.data;
};

export const generateJSON = async (thoughts, instructions) => {
  try {
    const response = await axios.post(`${API_URL}/llm/generate-json`, { thoughts, instructions });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'Failed to generate JSON');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request');
    }
  }
};