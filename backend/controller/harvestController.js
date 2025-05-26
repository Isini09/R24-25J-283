const database = require("../config/db");
const asyncHandler = require("express-async-handler");

// GET: GET THE DATES OF THE BLOCKS
const getDatesByIdController = asyncHandler(async (req, res) => {
  try {
    const { blockId } = req.params;
    const { data, error } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId);

    if (error || !data || data.length === 0) {
      return res.status(404).json({ error: "No block data found!" });
    }

    res.status(200).json({ blockData: data });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

const harvestDateController = asyncHandler(async (req, res) => {
  try {
    const { blockId, harvestDate, pruningDate } = req.body;

    // Check if blockId already exists
    const { data: existingBlock, error: fetchError } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({ error: "Failed to check existing block" });
    }

    if (existingBlock) {
      return res
        .status(400)
        .json({ error: "Block ID already exists, update the data" });
    }

    // Insert new block data
    const { data, error } = await database
      .from("BlockData")
      .insert([{ blockId, harvestDate, pruningDate }])
      .select();

    if (error || !data) {
      return res.status(400).json({ error: "Something went wrong!" });
    }

    res.status(200).json({ blockData: data });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

// PUT: UPDATE EXISTING DATA OF THE BLOCKS
const updateHarvestDataController = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { harvestDate, pruningDate } = req.body;

    const { data: isBlockExist, error: checkError } = await database
      .from("BlockData")
      .select("*")
      .eq("id", id);

    if (checkError || !isBlockExist || isBlockExist.length === 0) {
      return res
        .status(404)
        .json({ error: "The block you searched for does not exist!" });
    }

    const { error } = await database
      .from("BlockData")
      .update({ harvestDate, pruningDate }) // Updated to match request body variables
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: "Failed to update block data!" });
    }

    res.status(200).json({ message: "Updated Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

const deleteBlockDatabyId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await database.from("BlockData").delete().eq("id", id);

    if (error) {
      res.status(400).json({ message: "Request cannot be complete!" });
    }

    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

module.exports = {
  harvestDateController,
  updateHarvestDataController,
  getDatesByIdController,
  deleteBlockDatabyId,
};
