// backend/src/services/workspaceService.js

const Workspace = require('../models/Workspace');

exports.getWorkspace = async () => {
  let workspace = await Workspace.findOne();
  if (!workspace) {
    workspace = new Workspace({ blocks: [] });
    await workspace.save();
  }
  return workspace;
};

exports.saveWorkspace = async (blocks) => {
  let workspace = await Workspace.findOne();
  if (!workspace) {
    workspace = new Workspace();
  }
  workspace.blocks = blocks;
  await workspace.save();
  return workspace;
};