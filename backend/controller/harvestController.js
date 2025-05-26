const database = require("../config/db");
const asyncHandler = require("express-async-handler");

// GET: GET THE DATES OF THE BLOCKS
const getDatesByIdController = asyncHandler(async (req, res) => {
  try {
    const { blockId } = req.params;

    if (!blockId) {
      return res.status(400).json({ error: "Block ID is required!" });
    }

    const { data, error } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId);

    if (error) {
      return res
        .status(500)
        .json({ error: `Database error: ${error.message}` });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No block data found!" });
    }

    res.status(200).json({ blockData: data });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

//GET: FOR FRONTEND
const getDatesByIdControllerFE = asyncHandler(async (req, res) => {
  try {
    const { blockId } = req.params;

    if (!blockId) {
      return res.status(400).json({ error: "Block ID is required!" });
    }

    const { data, error } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId);

    if (error) {
      return res
        .status(500)
        .json({ error: `Database error: ${error.message}` });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No block data found!" });
    }

    res.status(200).json({ blockData: data[0] });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

// POST: CREATE NEW HARVEST DATA
const harvestDateController = asyncHandler(async (req, res) => {
  try {
    const { blockId, harvestDate, pruningDate } = req.body;

    // Validate required fields
    if (!blockId || !harvestDate || !pruningDate) {
      return res.status(400).json({
        error: "All fields (blockId, harvestDate, pruningDate) are required!",
      });
    }

    // Check if blockId already exists
    const { data: existingBlock, error: fetchError } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({
        error: `Failed to check existing block: ${fetchError.message}`,
      });
    }

    if (existingBlock) {
      return res
        .status(400)
        .json({ error: "Block ID already exists, use update instead" });
    }

    // Insert new block data
    const { data, error } = await database
      .from("BlockData")
      .insert([
        {
          blockId,
          harvestDate,
          pruningDate,
        },
      ])
      .select(); // Add select() to return the inserted data

    if (error) {
      return res.status(400).json({
        error: `Failed to create block data: ${error.message}`,
      });
    }

    res.status(201).json({
      message: "Block data created successfully",
      blockData: data[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

// PUT: UPDATE EXISTING DATA OF THE BLOCKS
const updateHarvestDataController = asyncHandler(async (req, res) => {
  try {
    const { blockId } = req.params;
    const { harvestDate, pruningDate } = req.body;

    // Validate required fields
    if (!blockId) {
      return res.status(400).json({ error: "Block ID is required!" });
    }

    if (!harvestDate && !pruningDate) {
      return res.status(400).json({
        error:
          "At least one field (harvestDate or pruningDate) is required for update!",
      });
    }

    // Check if block exists (fixed the variable reference)
    const { data: isBlockExist, error: checkError } = await database
      .from("BlockData")
      .select("*")
      .eq("blockId", blockId); // Fixed: was using 'id' instead of 'blockId'

    if (checkError) {
      return res.status(500).json({
        error: `Failed to check block existence: ${checkError.message}`,
      });
    }

    if (!isBlockExist || isBlockExist.length === 0) {
      return res
        .status(404)
        .json({ error: "The block you searched for does not exist!" });
    }

    // Prepare update object with only provided fields
    const updateData = {};
    if (harvestDate) updateData.harvestDate = harvestDate;
    if (pruningDate) updateData.pruningDate = pruningDate;

    const { error } = await database
      .from("BlockData")
      .update(updateData)
      .eq("blockId", blockId);

    if (error) {
      return res.status(400).json({
        error: `Failed to update block data: ${error.message}`,
      });
    }

    res.status(200).json({ message: "Updated Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Server error! Please check: ${error.message}` });
  }
});

// DELETE: DELETE BLOCK DATA BY ID
const deleteBlockDatabyId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required!" });
    }

    // Check if block exists before deletion
    const { data: existingBlock, error: checkError } = await database
      .from("BlockData")
      .select("*")
      .eq("id", id);

    if (checkError) {
      return res.status(500).json({
        error: `Failed to check block existence: ${checkError.message}`,
      });
    }

    if (!existingBlock || existingBlock.length === 0) {
      return res.status(404).json({
        error: "Block not found!",
      });
    }

    const { error } = await database.from("BlockData").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        error: `Failed to delete block: ${error.message}`,
      });
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
  getDatesByIdControllerFE,
  updateHarvestDataController,
  getDatesByIdController,
  deleteBlockDatabyId,
};
