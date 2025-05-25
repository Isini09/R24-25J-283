const express = require("express");
const router = express.Router();
const {
  sendYieldDataAndProcess,
} = require("../controller/emissionGuideController");
router.post("/guide-model/predict", sendYieldDataAndProcess);

module.exports = router;
