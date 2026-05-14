const express = require('express'); 
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

router.get('/data', protect, getDashboardData);

module.exports = router;