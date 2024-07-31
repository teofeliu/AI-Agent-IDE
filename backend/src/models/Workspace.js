const mongoose = require('mongoose');
const Block = require('./Block');

const workspaceSchema = new mongoose.Schema({
  name: String,
  description: String,
  blocks: [Block.schema]
});

module.exports = mongoose.model('Workspace', workspaceSchema);