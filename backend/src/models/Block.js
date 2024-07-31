// backend/src/models/Block.js

const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: String,
  type: String,
  properties: Object
});

module.exports = mongoose.model('Block', blockSchema);