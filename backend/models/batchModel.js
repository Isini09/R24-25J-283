const mongoose = require("mongoose");

// Define the schema for blockchain transactions (Now supports multiple records)
const blockchainSchema = new mongoose.Schema({
  transactionHash: { type: String, required: false },
  blockNumber: { type: Number, required: false },
  contractAddress: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
  actionType: { type: String, required: false }  // Example: "Batch Created", "Stage Updated"
});

// Define the schema for stage inputs
const stageInputSchema = new mongoose.Schema({
  stage: { type: String, required: true },
  inputs: { type: mongoose.Schema.Types.Mixed, required: true },
});

// Define the main batch schema
const batchSchema = new mongoose.Schema({
  batchId: { type: String, required: true, unique: true },
  supplierName: { type: String, required: true },
  location: { type: String, required: true },
  dateStarted: { type: Date, default: Date.now },
  status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
  qrCode: { type: String, required: false },
  stages: [stageInputSchema], 
  blockchain: [blockchainSchema]  // Changed from single object to array
});

// Export the Batch model
module.exports = mongoose.model("Batch", batchSchema);
