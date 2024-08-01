// backend/src/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const workspaceRoutes = require('./routes/workspaceRoutes');
const llmRoutes = require('./routes/llmRoutes');

const app = express();

console.log('Attempting to connect to MongoDB at:', config.mongoURI);

mongoose.connect(config.mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Failed to connect to MongoDB. Error details:', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.use('/api/workspace', workspaceRoutes);
app.use('/api/llm', llmRoutes);

module.exports = app;