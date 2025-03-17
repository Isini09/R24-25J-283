const express = require("express");
const router = express.Router();
const {
  harvestDateController,
  updateHarvestDataController,
  getHarvestDateController,
} = require("../controller/harvestController");

router.post("/harvest-data", harvestDateController);
router.get("/harvest-data/:id", updateHarvestDataController);
router.get("/get-harvest-data", getHarvestDateController);

module.exports = router;
