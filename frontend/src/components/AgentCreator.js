import React, { useState } from 'react';
import { createAgent } from '../services/api';

const AgentCreator = ({ onAgentCreated }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agentData = JSON.parse(jsonInput);
      console.log('Sending agent data:', agentData);
      const response = await createAgent(agentData);
      console.log('Response from server:', response);
      onAgentCreated();
      setJsonInput('');
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your agent JSON here"
      />
      <button type="submit">Create Agent</button>
    </form>
  );
};

export default AgentCreator;