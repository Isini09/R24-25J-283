import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { Bar } from "react-chartjs-2";
import { Download } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Register the necessary chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BatchDetails = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [humidityData, setHumidityData] = useState([]);
  const [blockchainData, setBlockchainData] = useState([]);
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
        { name: "plantationDate", label: "Date when the batch was planted" },
        { name: "plantationTemperature", label: "Temperature in the plantation field (°C)" },
        { name: "plantationHumidity", label: "Humidity level in the plantation field (%)" },
        { name: "fertilizersUsed", label: "Type of fertilizers applied" },
        { name: "pesticidesUsed", label: "Type of pesticides or herbicides used" },       
      ],
    },
    leafSorting: {
      inputs: [
        { name: "sortingDate", label: "Date when sorting was done" },
        { name: "totalLeaves", label: "Total leaves collected (g)" },
        { name: "maturedLeaves", label: "Weight of matured leaves (g)" },
        { name: "unmaturedLeaves", label: "Weight of unmatured leaves (g)" },
        { name: "acceptedLeaves", label: "Leaves accepted for processing (g)" },
        { name: "rejectedLeaves", label: "Leaves rejected due to maturity (g)" },
        { name: "isBatchAccepted", label: "Batch Accepted (True/False)" },
        { name: "responsiblePerson", label: "Responsible Person: Sorting Supervisor" },
      ],
    },
    withering: {
      inputs: [
        { name: "witheringDate", label: "Date when withering was performed" },
        { name: "initialWeight", label: "Weight of fresh leaves before withering (g)" },
        { name: "finalWeight", label: "Weight of leaves after withering (g)" },
        { name: "moistureReduction", label: "Percentage of moisture removed (%)" },
        { name: "witheringDuration", label: "Time spent in withering (hours)" },
        { name: "witheringTemperature", label: "Temperature during withering (°C)" },
        { name: "witheringHumidity", label: "Humidity during withering (%)" },
        { name: "witheringMethod", label: "Withering Method (Natural/Mechanical)" },
        { name: "responsiblePerson", label: "Responsible Person: Withering Supervisor" },
      ],
    },
    rolling: {
      inputs: [
        { name: "rollingDate", label: "Date when rolling was performed" },
        { name: "rollingPressure", label: "Pressure applied during rolling (kg)" },
        { name: "rollingTime", label: "Duration of rolling process (minutes)" },
        { name: "rollingMachineUsed", label: "Type of machine used" },
        { name: "rollingBatchWeight", label: "Weight of batch before and after rolling (g)" },
        { name: "rollingTemperature", label: "Temperature during rolling (°C)" },
        { name: "responsiblePerson", label: "Responsible Person: Rolling Supervisor" },
      ],
    },
    oxidation: {
      inputs: [
        { name: "oxidationDate", label: "Date when oxidation was performed" },
        { name: "oxidationTime", label: "Time for oxidation process (minutes)" },
        { name: "oxidationTemperature", label: "Temperature maintained during oxidation (°C)" },
        { name: "oxidationHumidity", label: "Humidity level during oxidation (%)" },
        { name: "oxidationEnzymes", label: "Enzymes or catalysts used" },
        { name: "colorChangeObservation", label: "Expected color change" },
        { name: "responsiblePerson", label: "Responsible Person: Oxidation Supervisor" },
      ],
    },
    drying: {
      inputs: [
        { name: "dryingDate", label: "Date when drying was performed" },
        { name: "dryingTime", label: "Duration of drying (minutes)" },
        { name: "dryingTemperature", label: "Temperature in drying chamber (°C)" },
        { name: "finalMoistureContent", label: "Moisture content after drying (%)" },
        { name: "dryingMachineUsed", label: "Type of dryer used" },
        { name: "dryingBatchWeight", label: "Weight before and after drying (g)" },
        { name: "responsiblePerson", label: "Responsible Person: Drying Supervisor" },
      ],
    },
    sifting: {
      inputs: [
        { name: "siftingDate", label: "Date when sifting was performed" },
        { name: "siftingMethod", label: "Sifting Method (Manual/Machine)" },
        { name: "teaGrades", label: "Different tea grades separated" },
        { name: "siftingBatchWeight", label: "Weight of batch before and after sifting (g)" },
        { name: "siftingMachineUsed", label: "Type of machine used" },
        { name: "responsiblePerson", label: "Responsible Person: Sifting Supervisor" },
      ],
    },
    packing: {
      inputs: [
        { name: "packingDate", label: "Date when packing was done" },
        { name: "packageType", label: "Type of packaging used (Paper, Tin, Plastic)" },
        { name: "packageWeight", label: "Weight of tea in each package (g)" },
        { name: "batchNumber", label: "Unique batch number assigned" },
        { name: "expiryDate", label: "Expiry date of the product" },
        { name: "packingMachineUsed", label: "Machine used for packing" },
        { name: "responsiblePerson", label: "Responsible Person: Packing Supervisor" },
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
          qrCode: response.data.qrCode,
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
  
  const validateStageInputs = () => {
    for (const [key, value] of Object.entries(stageInputs)) {
      if (!value) {
        toast.error(`Field ${key} is required.`);
        return false;
      }
      // Additional numeric validation can be added here
    }
    return true;
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
    if (!selectedStage) {
      toast.error("Please select a stage.");
      return;
    }

    if (!validateStageInputs()) return;
    
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


  const validateBatchDetails = () => {
    const { supplierName, location, dateStarted, status } = batchDetails;
    if (!supplierName || !location || !dateStarted || !status) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  const handleUpdateBatchDetails = async (e) => {
    e.preventDefault();
    console.log("Updated Batch Details:", batchDetails); // Debugging
  
    try {
      const updatedBatch = await axios.put(`http://localhost:5000/admin/${batchId}`, batchDetails);
      if (!validateBatchDetails()) return;
      
      console.log("Updated Batch Response:", updatedBatch.data); // Debugging
  
      setBatch(updatedBatch.data.batch); // Ensure this updates state
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

  const downloadQRCode = async () => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      
      // If the QR code is a base64 data URL, use it directly
      if (batchDetails.qrCode.startsWith('data:')) {
        link.href = batchDetails.qrCode;
      } else {
        // If it's a regular URL, fetch the image and convert to blob
        const response = await fetch(batchDetails.qrCode);
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
      }
      
      // Set download filename
      link.download = `qr-code-${Date.now()}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up object URL if created
      if (!batchDetails.qrCode.startsWith('data:')) {
        URL.revokeObjectURL(link.href);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Failed to download QR code. Please try again.');
    }
  };

  // Extract humidity data from stages
  const getHumidityDataFromStages = () => {
    const humidityData = [];
    
    stages.forEach((stage, index) => {
      const inputs = stage.inputs;
      let humidityValue = null;
      let label = '';
      
      // Check different humidity fields based on stage type
      if (stage.stage === 'plantation' && inputs.plantationHumidity) {
        humidityValue = parseFloat(inputs.plantationHumidity);
        label = `Plantation (${inputs.plantationDate || `Stage ${index + 1}`})`;
      } else if (stage.stage === 'withering' && inputs.witheringHumidity) {
        humidityValue = parseFloat(inputs.witheringHumidity);
        label = `Withering (${inputs.witheringDate || `Stage ${index + 1}`})`;
      } else if (stage.stage === 'oxidation' && inputs.oxidationHumidity) {
        humidityValue = parseFloat(inputs.oxidationHumidity);
        label = `Oxidation (${inputs.oxidationDate || `Stage ${index + 1}`})`;
      }
      
      if (humidityValue !== null && !isNaN(humidityValue)) {
        humidityData.push({
          label: label,
          humidity: humidityValue,
          stage: stage.stage
        });
      }
    });
    
    return humidityData;
  };

  const stageHumidityData = getHumidityDataFromStages();
  const humidityLabels = stageHumidityData.map(data => data.label);
  const humidityValues = stageHumidityData.map(data => data.humidity);

  const plantationHumidityChartData = {
    labels: humidityLabels,
    datasets: [
      {
        label: "Humidity Levels (%)",
        data: humidityValues,
        backgroundColor: stageHumidityData.map(data => {
          switch(data.stage) {
            case 'plantation': return "#4CAF50";
            case 'withering': return "#2196F3";
            case 'oxidation': return "#FF9800";
            default: return "#9C27B0";
          }
        }),
        borderColor: stageHumidityData.map(data => {
          switch(data.stage) {
            case 'plantation': return "#4CAF50";
            case 'withering': return "#2196F3";
            case 'oxidation': return "#FF9800";
            default: return "#9C27B0";
          }
        }),
        borderWidth: 1,
      },
    ],
  };

  if (!batch) return <div className="mt-10 text-lg font-bold text-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-900">
      <NavBarAdmin />
      <ToastContainer />
      
      <div className="ml-[250px] mt-[35px] p-6 w-full relative z-10">
        {/* Modern Header */}
        <div className="mb-8 ">
          <h1 className="mb-3 text-2xl font-bold text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text">
            Batch Details
          </h1>
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-white"></div>
        </div>

        {/* Main Batch Card */}
        <div className="p-8 mb-8 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-3xl hover:shadow-purple-500/25">
          {!editMode ? (
            <div className="space-y-6">
              <div className="flex items-start gap-16">
                {/* Batch Information */}
                <div className="flex-1 space-y-6">
                  {/* Batch ID - Hero */}
                  <div className="cursor-pointer group">
                    <p className="mb-2 text-3xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                      {batch.batchId}
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-transparent group-hover:from-purple-400 transition-all duration-300"></div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid gap-4">
                    <div className="flex items-center p-4 transition-all duration-300 group rounded-2xl hover:bg-white/5">
                      <div className="w-3 h-3 mr-4 transition-transform duration-300 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:scale-125"></div>
                      <span className="text-blue-200 font-medium mr-3 min-w-[100px]">Supplier:</span>
                      <span className="text-lg font-semibold text-white">{batch.supplierName}</span>
                    </div>

                    <div className="flex items-center p-4 transition-all duration-300 group rounded-2xl hover:bg-white/5">
                      <div className="w-3 h-3 mr-4 transition-transform duration-300 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 group-hover:scale-125"></div>
                      <span className="text-blue-200 font-medium mr-3 min-w-[100px]">Location:</span>
                      <span className="text-lg font-semibold text-white">{batch.location}</span>
                    </div>

                    <div className="flex items-center p-4 transition-all duration-300 group rounded-2xl hover:bg-white/5">
                      <div className="w-3 h-3 mr-4 transition-transform duration-300 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 group-hover:scale-125"></div>
                      <span className="text-blue-200 font-medium mr-3 min-w-[100px]">Date Started:</span>
                      <span className="text-lg font-semibold text-white">{new Date(batch.dateStarted).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center p-4 transition-all duration-300 group rounded-2xl hover:bg-white/5">
                      <div className={`w-3 h-3 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300 ${
                        batch.status === 'Completed' 
                          ? 'bg-gradient-to-r from-green-400 to-green-600 animate-pulse' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse'
                      }`}></div>
                      <span className="text-blue-200 font-medium mr-3 min-w-[100px]">Status:</span>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${
                        batch.status === 'Completed'
                          ? 'bg-green-500/20 text-green-300 border-green-400/50 shadow-green-400/25'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50 shadow-yellow-400/25'
                      } shadow-lg backdrop-blur-sm`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          batch.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'
                        } animate-pulse`}></div>
                        {batch.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* QR Code Section */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-75 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg group-hover:opacity-100"></div>
                    <div className="relative flex items-center justify-center w-48 h-48 p-4 transition-all duration-300 shadow-2xl backdrop-blur-xl bg-white/90 rounded-3xl group-hover:scale-105">
                      <img src={batchDetails.qrCode} className="object-contain w-full h-full rounded-2xl" alt="QR Code" />
                    </div>
                  </div>
                  <p className="mt-4 font-medium text-center text-blue-200">QR Code</p>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <Download size={16} />
                    Download QR Code
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button 
                  className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 group bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
                  onClick={() => setEditMode(true)}
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:opacity-100"></div>
                  <span className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Batch
                  </span>
                </button>
                
                <button 
                  className="relative px-8 py-4 overflow-hidden font-semibold text-red-300 transition-all duration-300 border-2 group border-red-400/50 rounded-2xl hover:scale-105 hover:bg-red-500/20 hover:border-red-400 hover:shadow-2xl hover:shadow-red-500/25"
                  onClick={handleDeleteBatch}
                >
                  <span className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Batch
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateBatchDetails} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Supplier Name</label>
                  <input 
                    type="text" 
                    name="supplierName" 
                    value={batchDetails.supplierName} 
                    onChange={handleBatchDetailChange} 
                    className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={batchDetails.location} 
                    onChange={handleBatchDetailChange} 
                    className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Date Started</label>
                  <input 
                    type="date" 
                    name="dateStarted" 
                    value={batchDetails.dateStarted} 
                    onChange={handleBatchDetailChange} 
                    className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Status</label>
                  <select 
                    name="status" 
                    value={batchDetails.status} 
                    onChange={handleBatchDetailChange} 
                    className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15"
                  >
                    <option value="In Progress" className="bg-slate-800">In Progress</option>
                    <option value="Completed" className="bg-slate-800">Completed</option>
                  </select>
                </div>
              </div>
          
          <div className="flex gap-4 pt-6 border-t border-white/10">
            <button 
              type="submit" 
              className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 group bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
            >
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:opacity-100"></div>
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </span>
            </button>
            
            <button 
              type="button" 
              className="px-8 py-4 font-semibold text-white transition-all duration-300 bg-slate-600/50 rounded-2xl hover:bg-slate-500/50 hover:scale-105 backdrop-blur-sm" 
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>

    {/* Blockchain Data Card */}
    {blockchainData && (
      <div className="p-8 mb-8 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-3xl hover:shadow-green-500/25">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Blockchain Details</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="p-4 transition-all duration-300 rounded-2xl bg-white/5 hover:bg-white/10">
              <span className="block mb-1 text-sm font-medium text-green-200">Batch ID</span>
              <p className="text-lg font-bold text-white">{blockchainData.batchId}</p>
            </div>
            <div className="p-4 transition-all duration-300 rounded-2xl bg-white/5 hover:bg-white/10">
              <span className="block mb-1 text-sm font-medium text-green-200">Supplier Name</span>
              <p className="text-lg font-bold text-white">{blockchainData.supplierName}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-24 h-24 shadow-2xl bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Add Stage Card */}
    <div className="p-8 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-3xl hover:shadow-purple-500/25 ">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Add Stage</h2>
      </div>
      
      <form onSubmit={handleAddStage} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-purple-200">Select Stage</label>
          <select 
            value={selectedStage} 
            onChange={handleStageChange} 
            className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15"
          >
            <option value="" className="bg-slate-800">Select Stage</option>
            {Object.keys(stagesConfig).map((stage) => (
              <option key={stage} value={stage} className="bg-slate-800">
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {selectedStage && (
          <div className="space-y-4 animate-fadeIn">
            {stagesConfig[selectedStage].inputs.map((input) => (
              <input
                key={input.name}
                type="text"
                name={input.name}
                placeholder={input.label}
                onChange={handleStageInputChange}
                className="w-full p-4 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-2xl placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15"
              />
            ))}
          </div>
        )}
        
        <button 
          type="submit" 
          className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 group bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
        >
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-600 to-emerald-700 group-hover:opacity-100"></div>
          <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Add Updates
          </span>
        </button>
      </form>
      
            {/* Stages Section */}
<div className=" mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-[1.02] mb-8">
  <div className="flex items-center gap-4 mb-8">
    <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-white">Process Stages</h2>
  </div>

  <div className="space-y-4">
    {stages.length > 0 ? (
      stages.map((stage, index) => (
        <div 
          key={index} 
          className="group backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
        >
          {editStageMode && currentStageIndex === index ? (
            <form onSubmit={handleUpdateStage} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.keys(stage.inputs).map((inputKey) => (
                  <div key={inputKey} className="space-y-2">
                    <label className="block text-sm font-medium text-blue-200 capitalize">
                      {inputKey.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="text"
                      name={inputKey}
                      value={stageInputs[inputKey] || ''}
                      onChange={handleStageInputChange}
                      className="w-full p-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15"
                      placeholder={`Enter ${inputKey.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  className="relative px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 group bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:opacity-100"></div>
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setEditStageMode(false)} 
                  className="px-6 py-3 font-semibold text-white transition-all duration-300 bg-slate-600/50 rounded-xl hover:bg-slate-500/50 hover:scale-105 backdrop-blur-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                    {stage.stage}
                  </h3>
                </div>
                <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-sm font-medium text-blue-200">
                    Stage {index + 1} of {stages.length}
                  </span>
                </div>
              </div>

              {/* Stage Data Display */}
              <div className="p-4 border bg-white/5 rounded-xl border-white/10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(stage.inputs).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-xs font-medium tracking-wide text-blue-200 uppercase">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <p className="p-2 text-sm font-semibold text-white border rounded-lg bg-white/5 border-white/10">
                        {value || '--'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handleEditStage(index)} 
                  className="relative px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 group bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:opacity-100"></div>
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </span>
                </button>
                
                <button 
                  onClick={() => handleDeleteStage(index)} 
                  className="relative px-6 py-3 overflow-hidden font-semibold text-red-300 transition-all duration-300 border-2 group border-red-400/50 rounded-xl hover:scale-105 hover:bg-red-500/20 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/25"
                >
                  <span className="relative flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <div className="py-12 text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full opacity-50 bg-gradient-to-r from-gray-400 to-gray-500">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h.01M9 16h.01" />
          </svg>
        </div>
        <p className="mb-2 text-lg font-medium text-gray-400">No stages available</p>
        <p className="text-sm text-gray-500">Stages will appear here once you add them to this batch.</p>
      </div>
    )}
  </div>
</div>

{/* Humidity Chart Section */}
<div className="p-8 mb-8 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-3xl hover:shadow-green-500/25">
  <div className="flex items-center gap-4 mb-8">
    <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
    <div>
      <h2 className="text-3xl font-bold text-white">Humidity Analytics</h2>
      <p className="mt-1 text-green-200">Real-time environmental monitoring</p>
    </div>
  </div>

  {/* Chart Container */}
  <div className="p-6 border rounded-2xl border-white/10 ">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-200">Live Data</span>
        </div>
        <div className="w-px h-4"></div>
        <span className="text-sm text-blue-200">Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
      
      <div className="flex gap-2">
        <button className="px-4 py-2 text-sm text-white transition-all duration-300 border rounded-lg bg-white/10 hover:bg-white/20 border-white/20">
          Export Data
        </button>
        <button className="px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105">
          View Details
        </button>
      </div>
    </div>
    
    {/* Chart Wrapper */}
    <div className="p-4 border rounded-xl border-white/10">
      <Bar 
        data={plantationHumidityChartData} 
        options={{ 
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'rgba(255, 255, 255, 0.8)',
                font: {
                  family: 'Inter, sans-serif'
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }} 
      />
    </div>
  </div>
</div>
          </div>
        </div>
        </div>
        );
      };

      export default BatchDetails;