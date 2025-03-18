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
        const [plantationhumidityData, setPlantationHumidityData] = useState([]);
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

          const fetchPlantationHumidityData = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/admin/${batchId}/plantation/humidity`); // Adjust the endpoint as needed
              setPlantationHumidityData(response.data);
            } catch (error) {
              console.error("Error fetching plantation humidity data:", error);
            }
          };

          fetchPlantationHumidityData();
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

        // Prepare data for the plantation humidity chart
        const plantationHumidityLabels = plantationhumidityData.map((data) => data.date); // Assuming you have a date field
        const plantationHumidityValues = plantationhumidityData.map((data) => data.humidity); // Assuming you have a humidity field

        const plantationHumidityChartData = {
          labels: plantationHumidityLabels,
          datasets: [
            {
              label: "Plantation Humidity (%)",
              data: plantationHumidityValues,
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50 ",
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
                  <div className="flex gap-[150px]">
                  <div>
                    <p className="text-lg font-semibold">{batch.batchId}</p>
                    <br></br>
                    <p><span className="font-semibold">Supplier:</span> {batch.supplierName}</p>
                    <p><span className="font-semibold">Location:</span> {batch.location}</p>
                    <p><span className="font-semibold">Date Started:</span> {new Date(batch.dateStarted).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Status:</span> {batch.status}</p>
                  </div>
                  
                  <div>
                    <img src={batchDetails.qrCode}/>
                  </div>
                  </div>
                  
                  <button 
                    className="px-4 py-2 mt-4 text-white bg-green-900 rounded-full hover:bg-white hover:text-green-900 hover:border hover:border-green-900"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Batch
                  </button>
                  <button 
                    className="px-4 py-2 mt-4 ml-4 text-green-900 border-2 border-green-900 rounded-full hover:bg-green-900 hover:text-white"
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
                    <button type="submit" className="px-4 py-2 text-white bg-green-900 rounded-full hover:bg-white hover:text-green-900 hover:border hover:border-green-900">Save Changes</button>
                    <button type="button" className="px-4 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>

            {/* Display Blockchain Data */}
            {blockchainData && (
              <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Blockchain Details</h2>
                <br></br>
                <p><strong>Batch ID:</strong> {blockchainData.batchId}</p>
                <p><strong>Supplier Name:</strong> {blockchainData.supplierName}</p>
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
              <button type="submit" className="px-4 py-2 mt-4 ml-4 text-green-900 border-2 border-green-900 rounded-full hover:bg-green-900 hover:text-white">Add Updates</button>
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
                        <div>
                        <p className="font-semibold">{stage.stage}</p>
                        <pre className="text-gray-500">{JSON.stringify(stage .inputs, null, 2)}</pre>
                        <button onClick={() => handleEditStage(index)} className="px-4 py-2 mt-4 text-white bg-green-900 rounded-full hover:bg-white hover:text-green-900 hover:border hover:border-green-900">Edit</button>
                        <button onClick={() => handleDeleteStage(index)} className="px-4 py-2 mt-4 ml-4 text-green-900 border-2 border-green-900 rounded-full hover:bg-green-900 hover:text-white">Delete</button>
                        </div>
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
              <Bar data={plantationHumidityChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
        );
      };

      export default BatchDetails;