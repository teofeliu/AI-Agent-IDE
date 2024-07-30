const mongoose = require('mongoose');
const Block = require('./Block');

const workspaceSchema = new mongoose.Schema({
  blocks: [Block.schema]
});

module.exports = mongoose.model('Workspace', workspaceSchema);