const express = require('express');
const router = express.Router();
const stringController = require('../controllers/stringController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, stringController.addStringing);

module.exports = router;
