// frontend/src/components/AgentCreator.js

import React, { useState } from 'react';
import { createAgent } from '../services/api';
import { generateThoughts, generateJSON } from '../services/llmService';

const AgentCreator = ({ onAgentCreated }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleGenerateThoughts = async () => {
    setLoading(true);
    try {
      const result = await generateThoughts(prompt);
      setThoughts(result.thoughts);
    } catch (error) {
      console.error('Error generating thoughts:', error);
    }
    setLoading(false);
  };

  const handleGenerateJSON = async () => {
    setLoading(true);
    try {
      const result = await generateJSON(thoughts, 'Generate a JSON structure for the AI agent based on the thoughts.');
      setJsonInput(result.json);
    } catch (error) {
      console.error('Error generating JSON:', error);
      // You might want to set an error state here and display it in the UI
      // setError(error.message); refactor / setup later
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Create Agent</h2>
      <h3>Option 1: Manual JSON Input</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your agent JSON here"
        />
        <button type="submit">Create Agent</button>
      </form>

      <h3>Option 2: AI-Assisted Creation</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt for agent creation"
      />
      <button onClick={handleGenerateThoughts} disabled={loading}>
        Generate Thoughts
      </button>
      {thoughts && (
        <>
          <h4>Generated Thoughts:</h4>
          <pre>{thoughts}</pre>
          <button onClick={handleGenerateJSON} disabled={loading}>
            Generate JSON
          </button>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default AgentCreator;