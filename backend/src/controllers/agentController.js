const Workspace = require('../models/Workspace');

exports.createAgent = async (req, res) => {
  try {
    const { agent } = req.body;
    
    if (!agent || !agent.layout || !agent.layout.blocks) {
      return res.status(400).json({ error: 'Invalid agent structure' });
    }

    const blocks = agent.layout.blocks.map(block => ({
      id: block.id,
      type: block.type,
      position: {
        y: block.position.y
      },
      // Store the full block data for future use
      rawData: block
    }));

    const workspace = new Workspace({
      name: agent.name,
      description: agent.description,
      blocks: blocks
    });

    await workspace.save();

    res.status(201).json(workspace);
  } catch (error) {
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