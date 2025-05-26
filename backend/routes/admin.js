const express = require('express');
const router = express.Router();
const Batch = require('../models/batchModel');
const Supplier = require('../models/Supplier');
const QRCode = require('qrcode'); 
const { web3, contract } = require('../utils/web3Setup'); 

// Get total count of products
router.get('/total-products', async (req, res) => {
  try {
    const totalProducts = await Batch.countDocuments(); // Count the number of documents in the Batch collection
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error.message);
    res.status(500).json({ error: "Failed to fetch total products" });
  }
});

router.post('/add', async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { batchId, supplierName, location, dateStarted, status } = req.body;

    const qrUrl = `http://localhost:3000/userview/${batchId}`;
    const qrCode = await QRCode.toDataURL(qrUrl);

    const newBatch = new Batch({
      batchId,
      supplierName,
      location,
      dateStarted,
      status,
      qrCode,
    });

    const savedData = await newBatch.save();
    console.log("Saved to MongoDB:", savedData);

    // Blockchain integration
    const blockchainData = {
      batchId: savedData.batchId,
      supplierName: savedData.supplierName,
    };

    const accounts = await web3.eth.getAccounts();
    const tx = contract.methods.addSensitiveData(blockchainData.batchId, blockchainData.supplierName);
    const gas = await tx.estimateGas({ from: accounts[0] });
    const gasPrice = await web3.eth.getGasPrice();

    const txData = {
      from: accounts[0],
      to: process.env.CONTRACT_ADDRESS,
      data: tx.encodeABI(),
      gas,
      gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Update MongoDB with blockchain transaction details
    const blockchainReceipt = {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      contractAddress: receipt.contractAddress,
      timestamp: new Date(),
      blockchainData,  // What was sent to the blockchain
    };

    await Batch.findOneAndUpdate(
      { batchId: batchId },
      { blockchain: blockchainReceipt }
    );

    return res.status(201).json({
      message: 'Batch added successfully!',
      batch: savedData,
      blockchainReceipt
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.get('/blockchain/:batchId', async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json({
      batchId: batch.batchId,
      supplierName: batch.supplierName,
      transactionHash: batch.blockchain.transactionHash,
      blockNumber: batch.blockchain.blockNumber,
      contractAddress: batch.blockchain.contractAddress,
      timestamp: batch.blockchain.timestamp,
    });

  } catch (error) {
    console.error("Error fetching blockchain data:", error.message);
    res.status(500).json({ error: "Failed to fetch blockchain data" });
  }
});



// In your supplierRoutes.js or batchRoutes.js
router.get('/:batchId/humidity', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: 'Batch not found' });

    // Extract humidity data from stages
    const humidityData = batch.stages.map(stage => ({
      stage: stage.stage,
      humidity: stage.inputs.humidity, // Assuming humidity is stored in inputs
    }));

    // Filter out stages that do not have humidity data
    const filteredHumidityData = humidityData.filter(data => data.humidity !== undefined);

    res.status(200).json(filteredHumidityData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get all batches
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ: Get batch details by batchId
router.get('/:batchId', async (req, res) => {
  try {
    console.log("Received batchId:", req.params.batchId);
    const batch = await Batch.findOne({ batchId: req.params.batchId });

    if (!batch) {
      console.log("Batch not found in DB");
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.status(200).json(batch);
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({ error: error.message });
  }
});


router.put('/:batchId', async (req, res) => {
  try {
    const { supplierName, location, dateStarted, status } = req.body;

    // Check if batch exists before updating
    const batchExists = await Batch.findOne({ batchId: req.params.batchId });
    if (!batchExists) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    

    // Update batch in MongoDB
    const updatedBatch = await Batch.findOneAndUpdate(
      { batchId: req.params.batchId },
      { supplierName, location, dateStarted, status },
      { new: true }
    );

    // Ensure update was successful
    if (!updatedBatch) {
      return res.status(404).json({ message: 'Batch not found after update' });
    }

    // Send updated data to the blockchain
    const accounts = await web3.eth.getAccounts();

    // Ensure Private Key Exists
    if (!process.env.PRIVATE_KEY) {
      return res.status(500).json({ message: "Private key is missing" });
    }

    const tx = contract.methods.updateBatch(
      updatedBatch.batchId,
      updatedBatch.supplierName,
      updatedBatch.location,
      new Date(updatedBatch.dateStarted).toISOString(),
      updatedBatch.status
    );

    let gas, gasPrice;
    try {
      gas = await tx.estimateGas({ from: accounts[0] });
      gasPrice = await web3.eth.getGasPrice();
    } catch (error) {
      return res.status(500).json({ message: "Error estimating gas", error: error.message });
    }

    const txData = {
      from: accounts[0],
      to: process.env.CONTRACT_ADDRESS,
      data: tx.encodeABI(),
      gas,
      gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Store blockchain transaction details in MongoDB
    const blockchainUpdate = {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      timestamp: new Date(),
    };

    const finalUpdatedBatch = await Batch.findOneAndUpdate(
      { batchId: req.params.batchId },
      { $push: { blockchainUpdates: blockchainUpdate } },
      { new: true }
    );

    return res.status(200).json({
      message: 'Batch updated successfully!',
      batch: finalUpdatedBatch,
      blockchainReceipt: blockchainUpdate,
    });

  } catch (error) {
    console.error("Error updating batch:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
  }
});



// DELETE: Delete a batch by batchId
router.delete('/:batchId', async (req, res) => {
  try {
    const deletedBatch = await Batch.findOneAndDelete({ batchId: req.params.batchId });
    if (!deletedBatch) return res.status(404).json({ message: 'Batch not found' });
    res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Stage
router.post("/:batchId/addstage", async (req, res) => {
  try {
    const { batchId } = req.params;
    const { stage, inputs } = req.body; 

    const batch = await Batch.findOne({ batchId });
    if (!batch) return res.status(404).send("Batch not found");

    const newStage = {
      stage,
      inputs,
    };

    batch.stages.push(newStage);
    await batch.save();

    res.json({ stages: batch.stages });
  } catch (error) {
    console.error("Error adding stage:", error);
    res.status(500).send("Server error");
  }
});

// READ: Get all stages for a specific batch by batchId
router.get('/:batchId/stages', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    
    res.status(200).json(batch.stages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Stage
router.put('/:batchId/updatestage/:index', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    
    const { stage, inputs } = req.body;
    batch.stages[req.params.index] = { stage, inputs };
    await batch.save();
    res.json({ stages: batch.stages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Stage
router.delete('/:batchId/deletestage/:index', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    
    batch.stages.splice(req.params.index, 1);
    await batch.save();
    res.json({ stages: batch.stages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:batchId/certifications", async (req, res) => {
  try {
    const certifications = await Batch.find({ batchId: req.params.batchId });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching certifications", error });
  }
});

// Add a new certification to a batch
router.post("/:batchId/certifications", async (req, res) => {
  try {
    const { name, type, issuedBy, date } = req.body;
    const batch = await Batch.findOne({ batchId: req.params.batchId });

    if (!batch) return res.status(404).json({ message: "Batch not found" });

    const newCertification = { name, type, issuedBy, date };
    batch.certifications.push(newCertification);
    await batch.save();

    res.status(201).json(batch.certifications);
  } catch (error) {
    res.status(500).json({ message: "Error adding certification", error });
  }
});


router.delete("/:batchId/certifications/:certIndex", async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    if (!batch) return res.status(404).json({ message: "Batch not found" });

    batch.certifications.splice(req.params.certIndex, 1);
    await batch.save();

    res.json(batch.certifications);
  } catch (error) {
    res.status(500).json({ message: "Error deleting certification", error });
  }
});

//Supplier Routes

// Create Supplier
router.post('/supplier/add', async (req, res) => {
  try {
    const {
      supplierId,
      name,
      companyName,
      location,
      contact,
      certifications,
      ingredientsSupplied,
      documents,
      status
    } = req.body;

    // Ensure supplierId and name exist
    if (!supplierId || !name) {
      return res.status(400).json({ error: 'supplierId and name are required.' });
    }

    const newSupplier = new Supplier({
      supplierId,
      name,
      companyName,
      location,
      contact,
      certifications,
      ingredientsSupplied,
      documents,
      status
    });

    const savedSupplier = await newSupplier.save();
    console.log("New supplier added:", savedSupplier);
    res.status(201).json(savedSupplier);
  } catch (err) {
    console.error("Error adding supplier:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get All Suppliers
router.get('/supplier/list', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.error("Error fetching suppliers:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get Supplier by Supplier ID
router.get('/supplier/list/:supplierId', async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ supplierId: req.params.supplierId });
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    console.error("Error fetching supplier:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update Supplier by Supplier ID
router.put('/supplier/list/:supplierId', async (req, res) => {
  try {
    const updated = await Supplier.findOneAndUpdate(
      { supplierId: req.params.supplierId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Supplier not found' });
    res.json(updated);
  } catch (err) {
    console.error("Error updating supplier:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete Supplier by Supplier ID
router.delete('/supplier/list/:supplierId', async (req, res) => {
  try {
    const deleted = await Supplier.findOneAndDelete({ supplierId: req.params.supplierId });
    if (!deleted) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    console.error("Error deleting supplier:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
