// frontend/src/components/AgentCreator.js
import React, { useState } from 'react';
import { createAgent } from '../services/api';
import { generateThoughts, generateJSON } from '../services/llmService';

const AgentCreator = ({ onAgentCreated }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isManualJSON, setIsManualJSON] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isManualJSON) {
        await createAgentFromJSON(input);
      } else {
        await createAgentFromPrompt(input);
      }
      setInput('');
      onAgentCreated();
    } catch (error) {
      console.error('Error creating agent:', error);
      setError('Error creating agent: ' + error.message);
    }

    setLoading(false);
  };

  const createAgentFromJSON = async (jsonString) => {
    const agentData = JSON.parse(jsonString);
    console.log('Sending agent data:', agentData);
    const response = await createAgent(agentData);
    console.log('Response from server:', response);
  };

  const createAgentFromPrompt = async (prompt) => {
    const thoughtsResult = await generateThoughts(prompt);
    console.log('Generated thoughts:', thoughtsResult.thoughts);
  
    // Split the thoughts into brainstorm and structure parts
    const structureMatch = thoughtsResult.thoughts.match(/STRUCTURE:\s*([\s\S]*)/);
    
    if (!structureMatch) {
      throw new Error('No structure found in generated thoughts');
    }
  
    const structure = structureMatch[1].trim();
    console.log('Structure:', structure);
  
    const jsonResult = await generateJSON(structure, 'Generate a JSON structure for the AI agent based on the given structure.');
    console.log('Generated JSON:', jsonResult.json);
  
    await createAgentFromJSON(jsonResult.json);
  };

  return (
    <div>
      <h2>Create Agent</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isManualJSON ? "Paste your agent JSON here" : "Enter your prompt for agent creation"}
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={isManualJSON}
              onChange={(e) => setIsManualJSON(e.target.checked)}
            />
            Manual JSON Input
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Agent...' : 'Create Agent'}
        </button>
      </form>
    </div>
  );
};

export default AgentCreator;