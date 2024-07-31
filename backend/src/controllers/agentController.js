// backend/src/controllers/AgentController.js

// Import the Workspace model from Mongoose
const Workspace = require('../models/Workspace');

// Export the createAgent function as part of the module
exports.createAgent = async (req, res) => {
  try {
    // Log the received data for debugging
    console.log('Received agent data:', req.body);
    
    // Destructure the agent object from the request body
    const { agent } = req.body;
    
    // Validate the agent structure
    if (!agent || !agent.layout || !agent.layout.blocks) {
      console.log('Invalid agent structure');
      // If invalid, send a 400 Bad Request response
      return res.status(400).json({ error: 'Invalid agent structure' });
    }

    // Process the blocks from the agent layout
    const blocks = agent.layout.blocks.map((block, index) => ({
      id: block.id,
      type: block.type,
      // Set the vertical position based on the block's index
      position: {
        y: index * 60 // Multiply by 60 to space out blocks vertically
      },
      // Store the original block data
      rawData: block
    }));

    // Log the processed blocks for debugging
    console.log('Processed blocks:', blocks);

    // Find an existing workspace or create a new one
    let workspace = await Workspace.findOne();
    if (!workspace) {
      workspace = new Workspace();
    }
    
    // Update the workspace with the new agent data
    workspace.name = agent.name;
    workspace.description = agent.description;
    workspace.blocks = blocks;

    // Save the updated workspace to the database
    await workspace.save();
    console.log('Workspace updated:', workspace);

    // Send the updated workspace as a JSON response with 200 OK status
    res.status(200).json(workspace);
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
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