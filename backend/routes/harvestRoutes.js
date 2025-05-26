const express = require("express");
const router = express.Router();
const {
  harvestDateController,
  updateHarvestDataController,
  getDatesByIdController,
  deleteBlockDatabyId,
  getDatesByIdControllerFE,
} = require("../controller/harvestController");

router.post("/harvest-data", harvestDateController);
router.put("/harvest-data/:blockId", updateHarvestDataController);
router.get("/get-harvest-data/:blockId", getDatesByIdController);
router.get("/get/harvest-data/:blockId", getDatesByIdControllerFE);
router.delete("/delete-harvest-data/:id", deleteBlockDatabyId);

module.exports = router;
