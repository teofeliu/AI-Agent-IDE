module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/ai-agent-ide',
    port: process.env.PORT || 3001,
    modelEndpoints: {
      gpt3: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      // Add other model endpoints as needed
    },
    // Add any other configuration variables you need
  };