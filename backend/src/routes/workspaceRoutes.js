const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.post('/create-agent', agentController.createAgent);
router.get('/', agentController.getWorkspace);
router.post('/clear', agentController.clearWorkspace); // Add this new route

module.exports = router;