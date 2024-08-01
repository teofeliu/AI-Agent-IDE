// backend/src/data/prompts.js

module.exports = {
    generateThoughts: `Given the following block types and their descriptions:
  {blockTypes}
  
  And the following available models:
  {models}
  
  Please provide a step-by-step thought process for creating an AI agent based on this prompt:
  {prompt}
  
  Think through the process carefully, explaining your reasoning and how you would use the different block types to construct the agent.`,
  
  generateJSON: `Based on the following thoughts:
{thoughts}

And using this JSON structure as a template:
{jsonTemplate}

Consider the following block types and their descriptions:
{blockTypes}

{instructions}

Provide the JSON structure for the AI agent, filling in the appropriate fields based on the thoughts and prompt. Ensure the JSON is valid, follows the template structure, and correctly utilizes the block types.

IMPORTANT: Your response should ONLY contain the JSON object, without any additional text or explanation. Ensure the JSON is properly formatted and can be parsed by JSON.parse(). Try to reduce the number of lines. write it in one line.`
};