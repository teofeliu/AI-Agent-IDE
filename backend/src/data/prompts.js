// backend/src/data/prompts.js

module.exports = {
  generateThoughts: `Given the following block types and their descriptions:
  {blockTypes}
  
  And the following available models:
  {models}
  
  Please create an AI agent based on this prompt:
  {prompt}
  
  First, brainstorm and explain your reasoning for the agent structure.
  Then, on a new line starting with "STRUCTURE:", provide a concise description of the agent's structure.
  
  For example:
  [Your brainstorming and reasoning here]
  STRUCTURE: An agent with one input block, two model blocks (GPT-4 and Claude), and one output block to combine their responses.`,

  generateJSON: `Based on the following thoughts:
{thoughts}

And using this JSON structure as a template:
{jsonTemplate}

Consider the following block types and their descriptions:
{blockTypes}

And the following available models:
{models}

{instructions}

Provide the JSON structure for the AI agent, filling in the appropriate fields based on the thoughts and prompt. Ensure the JSON is valid, follows the template structure, and correctly utilizes the block types.

IMPORTANT: Your response should ONLY contain the JSON object, without any additional text or explanation. Ensure the JSON is properly formatted and can be parsed by JSON.parse(). Try to reduce the number of lines. write it in one line.`
};