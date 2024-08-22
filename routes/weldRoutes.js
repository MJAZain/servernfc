const express = require('express');
const router = express.Router();
const weldController = require('../controllers/weldController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route to upload welding data
router.post('/add', authenticateToken, weldController.uploadWeldingData);

module.exports = router;
