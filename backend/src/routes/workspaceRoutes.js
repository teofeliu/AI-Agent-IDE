const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');

router.get('/', workspaceController.getWorkspace);
router.post('/', workspaceController.saveWorkspace);

module.exports = router;