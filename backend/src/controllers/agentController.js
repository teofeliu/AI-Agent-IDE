const Workspace = require('../models/Workspace');

exports.createAgent = async (req, res) => {
  try {
    console.log('Received agent data:', req.body);
    const { agent } = req.body;
    
    if (!agent || !agent.layout || !agent.layout.blocks) {
      console.log('Invalid agent structure');
      return res.status(400).json({ error: 'Invalid agent structure' });
    }

    const blocks = agent.layout.blocks.map(block => ({
      id: block.id,
      type: block.type,
      position: {
        y: block.position.y
      },
      rawData: block
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

exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne();
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearWorkspace = async (req, res) => {
    try {
      const workspace = await Workspace.findOne();
      if (workspace) {
        workspace.blocks = [];
        await workspace.save();
      }
      res.json({ message: 'Workspace cleared successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateWorkspace = async (req, res) => {
    try {
      const { blocks } = req.body;
      const workspace = await Workspace.findOne();
      if (!workspace) {
        workspace = new Workspace();
      }
      workspace.blocks = blocks;
      await workspace.save();
      res.json(workspace);
    } catch (error) {
      console.error('Error updating workspace:', error);
      res.status(500).json({ error: error.message });
    }
  };