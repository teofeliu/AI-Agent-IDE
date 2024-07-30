// backend/src/routes/index.js

const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

router.post('/process-text', textController.processText);

module.exports = router;