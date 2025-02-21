const express = require('express');
const router = express.Router();
const {getRealTimeEnvData, getHistoryEnvData} = require('../controller/envDataController');

router.get('/real-time-data/',getRealTimeEnvData);
router.get('/history-data/',getHistoryEnvData);

module.exports = router;