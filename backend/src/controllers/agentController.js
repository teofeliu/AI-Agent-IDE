// backend/src/controllers/agentController.js

const Workspace = require('../models/Workspace');
const Block = require('../models/Block');
const { Input, Output, Model } = require('../models/BlockTypes');
const supportedModels = require('../data/models.json').supportedModels;

exports.createAgent = async (req, res) => {
  try {
    console.log('Received agent data:', req.body);
    const { agent } = req.body;
    
    if (!agent || !agent.layout || !agent.layout.blocks) {
      console.log('Invalid agent structure');
      return res.status(400).json({ error: 'Invalid agent structure' });
    }

    const blocks = await Promise.all(agent.layout.blocks.map(async (block, index) => {
      let content;

      switch (block.type) {
        case 'Model':
          if (block.modelDescription) {
            const modelInfo = supportedModels.find(
              model => `${model.company} ${model.name}`.toLowerCase() === block.modelDescription.toLowerCase()
            );
            content = new Model({
              modelDescription: block.modelDescription,
              company: modelInfo ? modelInfo.company : null,
              name: modelInfo ? modelInfo.name : null
            });
          }
          break;
        case 'Input':
          content = new Input({
            content: block.content
          });
          break;
        case 'Output':
          content = new Output({
            content: block.content
          });
          break;
      }

      await content.save();

      return new Block({
        id: block.id,
        type: block.type,
        position: {
          y: index * 90 // Refactor
        },
        content: content
      });
    }));

    console.log('Processed blocks:', blocks);

    let workspace = await Workspace.findOne();
    if (!workspace) {
      workspace = new Workspace();
    }
    
    workspace.name = agent.name;
    workspace.description = agent.description;
    workspace.blocks = blocks;

    await workspace.save();
    console.log('Workspace updated:', workspace);

    res.status(200).json(workspace);
  } catch (error) {
    console.error('Error in createAgent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Export the getWorkspace function
exports.getWorkspace = async (req, res) => {
  try {
    console.log('Fetching workspace');
    // Find an existing workspace or create a new one
    let workspace = await Workspace.findOne();
    if (!workspace) {
      workspace = new Workspace({ blocks: [] });
      await workspace.save();
    }
    console.log('Fetched workspace:', workspace);
    // Send the workspace as a JSON response
    res.json(workspace);
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
    console.error('Error in getWorkspace:', error);
    res.status(500).json({ error: error.message });
  }
};

// Export the clearWorkspace function
exports.clearWorkspace = async (req, res) => {
  try {
    // Find the existing workspace
    const workspace = await Workspace.findOne();
    if (workspace) {
      // Clear the blocks array
      workspace.blocks = [];
      // Save the updated workspace
      await workspace.save();
    }
    // Send a success message as a JSON response
    res.json({ message: 'Workspace cleared successfully' });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
};

// Export the updateWorkspace function
exports.updateWorkspace = async (req, res) => {
  try {
    // Destructure blocks from the request body
    const { blocks } = req.body;
    // Find an existing workspace or create a new one
    let workspace = await Workspace.findOne();
    if (!workspace) {
      workspace = new Workspace();
    }
    // Update the blocks in the workspace
    workspace.blocks = blocks;
    // Save the updated workspace
    await workspace.save();
    // Send the updated workspace as a JSON response
    res.json(workspace);
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
    console.error('Error updating workspace:', error);
    res.status(500).json({ error: error.message });
  }
};