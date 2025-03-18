const express = require("express");
const router = express.Router();
const {
  harvestDateController,
  updateHarvestDataController,
  getDatesByIdController,
  deleteBlockDatabyId,
} = require("../controller/harvestController");

router.post("/harvest-data", harvestDateController);
router.put("/harvest-data/:id", updateHarvestDataController);
router.get("/get-harvest-data/:blockId", getDatesByIdController);
router.delete("/delete-harvest-data/:id", deleteBlockDatabyId);

module.exports = router;
