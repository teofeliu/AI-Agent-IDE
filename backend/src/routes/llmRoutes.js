// backend/src/routes/llmRoutes.js

const express = require('express');
const router = express.Router();
const llmController = require('../controllers/llmController');

router.post('/generate-thoughts', llmController.generateThoughts);
router.post('/generate-json', llmController.generateJSON);

module.exports = router;