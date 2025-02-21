const express = require('express');
const router = express.Router();
const {getRealTimeEnvData} = require('../controller/envDataController');

router.get('/',getRealTimeEnvData);

module.exports = router;