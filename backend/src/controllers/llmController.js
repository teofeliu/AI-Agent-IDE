// backend/src/controllers/llmController.js

const { OpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const prompts = require('../data/prompts');
const { readJSONFile } = require('../utils/fileUtils');

const model = new OpenAI({ temperature: 0.7 });

const extractJSON = (text) => {
    try {
      const jsonRegex = /{[\s\S]*}/;
      const match = text.match(jsonRegex);
      if (match) {
        const jsonString = match[0];
        // Attempt to parse and stringify to ensure valid JSON
        return JSON.stringify(JSON.parse(jsonString));
      }
    } catch (error) {
      console.error('Error extracting JSON:', error);
    }
    return null;
  };

  exports.generateThoughts = async (req, res) => {
    try {
      const { prompt } = req.body;
      console.log('Generate Thoughts - Input prompt:', prompt);
  
      const models = await readJSONFile('models.json');
      const blockTypes = await readJSONFile('blockTypes.json');
  
      const modelList = models.supportedModels.map(model => `${model.company} ${model.name}`).join(', ');
      const blockTypeInfo = JSON.stringify(blockTypes.blockTypes, null, 2);
  
      const promptTemplate = PromptTemplate.fromTemplate(prompts.generateThoughts);
  
      const formattedPrompt = await promptTemplate.format({ 
        blockTypes: blockTypeInfo,
        models: modelList,
        prompt 
      });
      console.log('Generate Thoughts - Formatted prompt:', formattedPrompt);
      
      const result = await model.call(formattedPrompt);
      console.log('Generate Thoughts - Raw output:', result);
  
      res.json({ thoughts: result });
    } catch (error) {
      console.error('Error in generateThoughts:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.generateJSON = async (req, res) => {
    try {
      const { thoughts, instructions } = req.body;
      console.log('Generate JSON - Input thoughts:', thoughts);
      console.log('Generate JSON - Input instructions:', instructions);
  
      const jsonTemplate = await readJSONFile('agentTemplate.json');
      const blockTypes = await readJSONFile('blockTypes.json');
  
      const promptTemplate = PromptTemplate.fromTemplate(prompts.generateJSON);
  
      const formattedPrompt = await promptTemplate.format({ 
        thoughts, 
        jsonTemplate: JSON.stringify(jsonTemplate, null, 2),
        blockTypes: JSON.stringify(blockTypes.blockTypes, null, 2),
        instructions 
      });
      console.log('Generate JSON - Formatted prompt:', formattedPrompt);
      
      const result = await model.call(formattedPrompt);
      console.log('Generate JSON - Raw output:', result);
  
      // Extract JSON from the result
      const jsonString = extractJSON(result);
      console.log('Generate JSON - Extracted JSON string:', jsonString);
      
      if (!jsonString) {
        return res.status(400).json({ error: 'Failed to generate valid JSON' });
      }
  
      res.json({ json: jsonString });
    } catch (error) {
      console.error('Error in generateJSON:', error);
      res.status(500).json({ error: error.message });
    }
  };