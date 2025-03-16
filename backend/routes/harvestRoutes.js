const express = require("express");
const router = express.Router();
const {
  harvestDateController,
  updateHarvestDataController,
} = require("../controller/harvestController");

router.post("/harvest-data", harvestDateController);
router.get("/harvest-data/:id", updateHarvestDataController);

module.exports = router;
