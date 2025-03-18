import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Register the necessary chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BatchDetails = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [humidityData, setHumidityData] = useState([]);
  const [blockchainData, setBlockchainData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [batchDetails, setBatchDetails] = useState({
    supplierName: "",
    location: "",
    dateStarted: "",
    status: "",
  });
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState("");
  const [stageInputs, setStageInputs] = useState({});
  const [editStageMode, setEditStageMode] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(null);

  const stagesConfig = {
    plantation: {
      inputs: [
        { name: "plantType", label: "Type of Plant" },
        { name: "plantDate", label: "Date of Planting" },
        { name: "humidity", label: "Humidity (%)" },
      ],
    },
    processing: {
      inputs: [
        { name: "processingMethod", label: "Processing Method" },
        { name: "temperature", label: "Temperature" },
        { name: "duration", label: "Duration" },
      ],
    },
    packaging: {
      inputs: [
        { name: "packageType", label: "Type of Packaging" },
        { name: "packageDate", label: "Date of Packaging" },
      ],
    },
  };

  

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${batchId}`);
        setBatch(response.data);
        setBatchDetails({
          supplierName: response.data.supplierName,
          location: response.data.location,
          dateStarted: response.data.dateStarted,
          status: response.data.status,
        });
        setStages(response.data.stages || []);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
    };

    const fetchBlockchainData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/blockchain/${batchId}`);
        setBlockchainData(response.data);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      }
    };

    const fetchHumidityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${batchId}/humidity`);
        setHumidityData(response.data);
      } catch (error) {
        console.error("Error fetching humidity data:", error);
      }
    };

    fetchBatchDetails();
    fetchBlockchainData();
    fetchHumidityData();
  }, [batchId]);

  
  const handleBatchDetailChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails({ ...batchDetails, [name]: value });
  };

  const handleStageChange = (e) => {
    const stage = e.target.value;
    setSelectedStage(stage);
    setStageInputs({});
  };

  const handleStageInputChange = (e) => {
    const { name, value } = e.target;
    setStageInputs({ ...stageInputs, [name]: value });
  };

  const handleEditStage = (index) => {
    setEditStageMode(true);
    setCurrentStageIndex(index);
    setSelectedStage(stages[index].stage); // Set selected stage
    setStageInputs({ ...stages[index].inputs }); // Clone inputs
  };
  

  const handleUpdateStage = async (e) => {
    e.preventDefault();
    if (currentStageIndex === null) return;
  
    try {
      const updatedStage = {
        stage: selectedStage, // Keep the existing stage type
        inputs: stageInputs,  // Updated input values
      };
  
      const response = await axios.put(
        `http://localhost:5000/admin/${batchId}/updatestage/${currentStageIndex}`,
        updatedStage
      );
  
      setStages(response.data.stages); // Ensure response returns the full updated array
      setEditStageMode(false);
      setCurrentStageIndex(null);
      setStageInputs({});
      toast.success("Stage Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to Update");
      console.error("Error updating stage:", error);
    }
  };
  

  const handleDeleteStage = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${batchId}/deletestage/${index}`);
      const updatedStages = stages.filter((_, i) => i !== index);
      setStages(updatedStages);
      toast.success("Stage Deleted Successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to Delete");
    }
  };

  const handleAddStage = async (e) => {
    e.preventDefault();
    if (!selectedStage) return;
    try {
      const newStage = {
        stage: selectedStage,
        inputs: stageInputs,
      };
      const response = await axios.post(`http://localhost:5000/admin/${batchId}/addstage`, newStage);
      setStages(response.data.stages);
      setSelectedStage("");
      setStageInputs({});
      toast.success("Stage Added successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to Add Updates");
    }
  };

const handleUpdateBatchDetails = async (e) => {
  e.preventDefault();
  try {
    const updatedBatch = await axios.put(`http://localhost:5000/admin/${batchId}`, batchDetails);
    setBatch(updatedBatch.data);
    setEditMode(false);
    toast.success("Batch Updated Successfully!", { position: "top-right", autoClose: 3000 });
  } catch (error) {
    toast.error("Failed to Update Batch");
    console.error("Error updating batch:", error);
  }
};

  const handleDeleteBatch = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/${batchId}`);
      toast.success("Batch Deleted Successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to Delete Batch");
    }
  };

  const humidityLabels = humidityData.map((data) => data.stage);
  const humidityValues = humidityData.map((data) => data.humidity);

  const chartData = {
    labels: humidityLabels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidityValues,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
    ],
  };

  if (!batch) return <div className="mt-10 text-lg font-bold text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBarAdmin />
      <ToastContainer /> 
      <div className="ml-[250px] mt-[40px] p-6 w-full">

        <h1 className="mb-6 text-3xl font-bold">Batch Details</h1>
        <div className="flex items-start justify-between p-6 bg-white rounded-lg shadow-lg">
          {!editMode ? (
            <div>
              <p className="text-lg font-semibold">Batch ID: {batch.batchId}</p>
              <p><span className="font-semibold">Supplier:</span> {batch.supplierName}</p>
              <p><span className="font-semibold">Location:</span> {batch.location}</p>
              <p><span className="font-semibold">Date Started:</span> {new Date(batch.dateStarted).toLocaleDateString()}</p>
              <p><span className="font-semibold">Status:</span> {batch.status}</p>
              <button 
                className="px-4 py-2 mt-4 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => setEditMode(true)}
              >
                Edit Batch
    
              </button>
              <button 
                className="px-4 py-2 mt-4 ml-4 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                onClick={handleDeleteBatch}
              >
                Delete Batch
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateBatchDetails} className="w-1/2">
              <input type="text" name="supplierName" value={batchDetails.supplierName} onChange={handleBatchDetailChange} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
              <input type="text" name="location" value={batchDetails.location} onChange={handleBatchDetailChange} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
              <input type="date" name="dateStarted" value={batchDetails.dateStarted} onChange={handleBatchDetailChange} className="w-full p-2 mb-2 border border-gray-300 rounded-md" />
              <select name="status" value={batchDetails.status} onChange={handleBatchDetailChange} className="w-full p-2 mb-2 border border-gray-300 rounded-md">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex gap-4 mt-4">
                <button type="submit" className="px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700">Save Changes</button>
                <button type="button" className="px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        

        {/* Display Blockchain Data */}

        {blockchainData && (
          <div className="p-6 mt-10 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Blockchain Data</h2>
            <p><span className="font-semibold">Batch ID:</span> {blockchainData.batchId}</p>
            <p><span className="font-semibold">Supplier Name:</span> {blockchainData.supplierName}</p>
            <p><span className="font-semibold">Timestamp:</span> {new Date(blockchainData.timestamp * 1000).toLocaleString()}</p>
          </div>
        )}

        <h2 className="mt-10 mb-4 text-2xl font-semibold">Add Stage</h2>
        <form onSubmit={handleAddStage} className="mt-4">
          <select value={selectedStage} onChange={handleStageChange} className="p-2 mb-2 border border-gray-300 rounded-md">
            <option value="">Select Stage</option>
            {Object.keys(stagesConfig).map((stage) => (
              <option key={stage} value={stage}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
            ))}
          </select>
          {selectedStage && stagesConfig[selectedStage].inputs.map((input) => (
            <input
              key={input.name}
              type="text"
              name={input.name}
              placeholder={input.label}
              onChange={handleStageInputChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
          ))}
          <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add Stage</button>
        </form>

        <h2 className="mt-10 mb-4 text-2xl font-semibold">Stages</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          {stages.length > 0 ? (
            stages.map((stage, index) => (
              <div key={index} className="py-2 border-b">
                {editStageMode && currentStageIndex === index ? (
                  <form onSubmit={handleUpdateStage} className="flex gap-2">
                    {Object.keys(stage.inputs).map((inputKey) => (
                      <input
                        key={inputKey}
                        type="text"
                        name={inputKey}
                        value={stageInputs[inputKey] || ''}
                        onChange={handleStageInputChange}
                        className="px-2 py-1 border rounded"
                      />
                    ))}
                    <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded-md">Save</button>
                    <button type="button" onClick={() => setEditStageMode(false)} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
                  </form>
                ) : (
                  <>
                    <p className="font-semibold">{stage.stage}</p>
                    <pre className="text-gray-500">{JSON.stringify(stage.inputs, null, 2)}</pre>
                    <button onClick={() => handleEditStage(index)} className="px-2 py-1 text-white bg-yellow-500 rounded-md">Edit</button>
                    <button onClick={() => handleDeleteStage(index)} className="px-2 py-1 text-white bg-red-600 rounded-md">Delete</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No stages available for this batch.</p>
          )}
        </div>
        <h2 className="mt-6 text-2xl font-semibold">Humidity Chart</h2>
        <div className="mt-4">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;