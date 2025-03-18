// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductPassport {
    struct Batch {
        string batchId;
        string supplierName;
        string location;
        string dateStarted;
        string status;
        uint version;
    }

    struct Stage {
        string stage;
        string inputs;
    }

    struct SensitiveData {
        string batchId;
        string supplierName;
    }

    // Mapping to store all versions of a batch
    mapping(string => Batch[]) public batchHistory;
    
    // Tracks processing stages per batch ID
    mapping(string => Stage[]) public batchStages;

    // Mapping for sensitive data
    mapping(string => SensitiveData) public sensitiveDataMapping;

    // Events
    event BatchAdded(string batchId, string supplierName, string location, string dateStarted, string status, uint version);
    event BatchUpdated(string batchId, string supplierName, string location, string dateStarted, string status, uint version);
    event StageAdded(string batchId, string stage, string inputs);
    event SensitiveDataAdded(string batchId, string supplierName);

    // Modifier to check if a batch exists
    modifier batchExists(string memory _batchId) {
        require(batchHistory[_batchId].length > 0, "Batch does not exist");
        _;
    }

    // Function to add a new batch
    function addBatch(
        string memory _batchId,
        string memory _supplierName,
        string memory _location,
        string memory _dateStarted,
        string memory _status
    ) public {
        require(batchHistory[_batchId].length == 0, "Batch already exists");

        batchHistory[_batchId].push(Batch(_batchId, _supplierName, _location, _dateStarted, _status, 1));
        emit BatchAdded(_batchId, _supplierName, _location, _dateStarted, _status, 1);
    }

    // Function to update a batch (stores as a new version)
    function updateBatch(
        string memory _batchId,
        string memory _supplierName,
        string memory _location,
        string memory _dateStarted,
        string memory _status
    ) public batchExists(_batchId) {
        uint newVersion = batchHistory[_batchId].length + 1;
        batchHistory[_batchId].push(Batch(_batchId, _supplierName, _location, _dateStarted, _status, newVersion));
        
        emit BatchUpdated(_batchId, _supplierName, _location, _dateStarted, _status, newVersion);
    }

    // Function to add a new stage to a batch
    function addStage(
        string memory _batchId,
        string memory _stage,
        string memory _inputs
    ) public batchExists(_batchId) {
        batchStages[_batchId].push(Stage(_stage, _inputs));
        emit StageAdded(_batchId, _stage, _inputs);
    }

    // Function to add sensitive data securely
    function addSensitiveData(string memory _batchId, string memory _supplierName) public {
        sensitiveDataMapping[_batchId] = SensitiveData(_batchId, _supplierName);
        emit SensitiveDataAdded(_batchId, _supplierName);
    }

    // Function to retrieve the latest batch details
    function getLatestBatch(string memory _batchId) public view returns (Batch memory) {
        require(batchHistory[_batchId].length > 0, "Batch does not exist");
        return batchHistory[_batchId][batchHistory[_batchId].length - 1]; // Return the latest version
    }

    // Function to retrieve the full batch history
    function getBatchHistory(string memory _batchId) public view returns (Batch[] memory) {
        return batchHistory[_batchId];
    }

    // Function to retrieve stages for a specific batch
    function getStages(string memory _batchId) public view returns (Stage[] memory) {
        return batchStages[_batchId];
    }

    // Function to retrieve sensitive data
    function getSensitiveData(string memory _batchId) public view returns (SensitiveData memory) {
        return sensitiveDataMapping[_batchId];
    }
}