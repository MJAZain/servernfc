const express = require('express');
const router = express.Router();
const fitupController = require('../controllers/fitupController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, fitupController.addFitup);

module.exports = router;
