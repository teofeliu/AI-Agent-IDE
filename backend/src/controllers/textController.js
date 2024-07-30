const langchainService = require('../services/langchainService');

const processText = (req, res) => {
    const text = req.body.text;
    const tokens = langchainService.tokenizeText(text);
    res.json({ tokens });
};

module.exports = { processText };