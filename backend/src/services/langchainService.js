// backend/src/services/langchainService.js

const langchain = require('langchain');

const tokenizeText = (text) => {
    return langchain.tokenize(text);
};

module.exports = { tokenizeText };