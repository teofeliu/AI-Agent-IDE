// backend/src/models/Block.js

const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ['Input', 'Model', 'Output'],
    required: true
  },
  position: {
    y: Number
  },
  content: mongoose.Schema.Types.Mixed  // This will store the Input, Model, or Output object
});

module.exports = mongoose.model('Block', blockSchema);