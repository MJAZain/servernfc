const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/pipes', authenticateToken, searchController.searchPipesWithHistory);

module.exports = router;
