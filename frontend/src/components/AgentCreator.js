// frontend/src/components/AgentCreator.js

// Import React and the useState hook for managing component state
import React, { useState } from 'react';
// Import the createAgent function from the API service
import { createAgent } from '../services/api';

// Define the AgentCreator component as a functional component
// It receives onAgentCreated as a prop, which is a callback function
const AgentCreator = ({ onAgentCreated }) => {
  // Use the useState hook to create a state variable 'jsonInput' and its setter function
  // Initialize jsonInput as an empty string
  const [jsonInput, setJsonInput] = useState('');

  // Define the form submission handler
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault();
    try {
      // Parse the JSON input string into a JavaScript object
      const agentData = JSON.parse(jsonInput);
      // Log the parsed agent data (for debugging purposes)
      console.log('Sending agent data:', agentData);
      
      // Call the createAgent function from the API service
      // This sends a POST request to the backend
      const response = await createAgent(agentData);
      // Log the response from the server (for debugging purposes)
      console.log('Response from server:', response);
      
      // Call the onAgentCreated callback function
      // This typically triggers a refresh of the parent component
      onAgentCreated();
      
      // Clear the input field after successful submission
      setJsonInput('');
    } catch (error) {
      // If an error occurs (e.g., invalid JSON), log it to the console
      console.error('Error creating agent:', error);
    }
  };

  // Return the JSX for rendering
  return (
    // Create a form element with an onSubmit event handler
    <form onSubmit={handleSubmit}>
      {/* Create a textarea for JSON input */}
      <textarea
        // Set the value of the textarea to the jsonInput state
        // This makes it a controlled component
        value={jsonInput}
        // Handle changes to the textarea
        // Update the jsonInput state with the new value
        onChange={(e) => setJsonInput(e.target.value)}
        // Set a placeholder text for the textarea
        placeholder="Paste your agent JSON here"
      />
      {/* Create a submit button for the form */}
      <button type="submit">Create Agent</button>
    </form>
  );
};

// Export the AgentCreator component so it can be imported elsewhere
export default AgentCreator;