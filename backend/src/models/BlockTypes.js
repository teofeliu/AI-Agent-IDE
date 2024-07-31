const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  content: String
});

const outputSchema = new mongoose.Schema({
  content: String
});

const modelSchema = new mongoose.Schema({
  modelDescription: String,
  company: String,
  name: String
});

module.exports = {
  Input: mongoose.model('Input', inputSchema),
  Output: mongoose.model('Output', outputSchema),
  Model: mongoose.model('Model', modelSchema)
};