const database = require("../config/db");
const asyncHandler = require("express-async-handler");

// GET: GET THE DATES OF THE BLOCKS
const getHarvestDateController = asyncHandler(async (req, res) => {
  try {
    const { data, error } = await database.from("BlockData").select("*");

    if (error || !data) {
      return res.status(400).json({ error: "Failed to fetch block data!" });
    }

    res.status(200).json({ blockData: data });
  } catch (error) {
    res.status(500).json({ error: `Server error! Please check ${error}` });
  }
});

// POST: SEND DATES OF THE BLOCKS TO THE DATABASE
const harvestDateController = asyncHandler(async (req, res) => {
  try {
    const { blockId, harvestDate, pruningDate } = req.body;

    const { statusText, error } = await database.from("BlockData").insert({
      blockId: blockId,
      harvestDate: harvestDate,
      pruningDate: pruningDate,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.message || "Something went wrong!" });
    }

    res.status(200).json({ blockData: statusText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please check." });
  }
});

// PUT: UPDATE EXISTING DATA OF THE BLOCKS
const updateHarvestDataController = asyncHandler(async (req, res) => {
  try {
    const { blockId } = req.params;
    const { harvestDate, prooningDate } = req.body;

    const { data: isBlockExist, error: checkError } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId);

    if (checkError || !isBlockExist || isBlockExist.length === 0) {
      return res
        .status(404)
        .json({ error: "The block you searched for does not exist!" });
    }

    const { data, error } = await database
      .from("BlockData")
      .update({ harvestDate, prooningDate })
      .eq("id", blockId);

    if (error || !data) {
      return res.status(400).json({ error: "Failed to update block data!" });
    }

    res.status(200).json({ updatedBlockData: data });
  } catch (error) {
    res.status(500).json({ error: `Server error! Please check ${error}` });
  }
});

module.exports = {
  harvestDateController,
  updateHarvestDataController,
  getHarvestDateController,
};
