const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: String,
  type: String,
  position: {
    y: Number
  },
  rawData: Object
});

const workspaceSchema = new mongoose.Schema({
  name: String,
  description: String,
  blocks: [blockSchema]
});

module.exports = mongoose.model('Workspace', workspaceSchema);