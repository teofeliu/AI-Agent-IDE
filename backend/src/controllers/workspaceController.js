const workspaceService = require('../services/workspaceService');

exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await workspaceService.getWorkspace();
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveWorkspace = async (req, res) => {
  try {
    const { blocks } = req.body;
    const workspace = await workspaceService.saveWorkspace(blocks);
    res.json(workspace);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};