const express = require('express');
const router = express.Router();
const pipeController = require('../controllers/pipeController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, pipeController.addPipe);
router.get('/:id', authenticateToken, pipeController.checkPipeRegistration);

module.exports = router;
