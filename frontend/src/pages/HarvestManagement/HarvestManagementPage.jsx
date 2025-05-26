import React, { useState } from "react";
import axios from "axios";
import UpperPanel from "../../components/UpperPanel";

const Harvest = () => {
  const [showHarvest, setShowHarvest] = React.useState(true);
  const [showPrune, setShowPrune] = React.useState(false);

  const getHarvestData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-harvest-data/${blockId}`
      );
    } catch (error) {
      console.error("Error fetching harvest data:", error);
    }
  };

  const [blockId, setBlockId] = useState(" ");
  const [harvestDate, setHarvestDate] = useState(" ");
  const [pruneDate, setPruneDate] = useState(" ");

  const postHarvestData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/harvest-data",

        { blockId, harvestDate }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.message);
      console.error("Error post harvest data:", error);
      window.location.reload();
    }
  };

  const postPruneData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/harvest-data",
        { blockId, pruningDate: pruneDate }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      alert(error.message);
      console.error("Error posting prune data:", error);
      window.location.reload();
    }
  };

  const updateHarvestData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/harvest-data/${blockId}`,
        { blockId, harvestDate }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating harvest data:", error);
    }
  };

  const updatePruneData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/harvest-data/${blockId}`,
        { blockId, pruneDate }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating harvest data:", error);
    }
  };
  return (
    <div className="h-screen bg-gray-900">
      <UpperPanel />
      <div className="flex justify-center pt-8 ">
        <h1 className="text-5xl font-bold text-green-400">Harvest Management</h1>
      </div>
      
      <div className="flex justify-center mt-12">
        <div className="p-6 bg-transparent border-2 border-white rounded-lg">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">Block ID</h1>
              <input
                className="w-48 h-10 px-3 text-green-400 bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400"
                onChange={(event) => setBlockId(event.target.value)}
                type="text"
                value={blockId}
                placeholder="Enter Block ID"
              />
            </div>

            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">Harvest Date</h1>
              <input
                className="w-48 h-10 px-3 text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400"
                type="date"
                onChange={(event) => setHarvestDate(event.target.value)}
                value={harvestDate}
              />
            </div>

            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">Prune Date</h1>
              <input
                className="w-48 h-10 px-3 text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400"
                type="date"
                onChange={(event) => setPruneDate(event.target.value)}
                value={pruneDate}
              />
            </div>

            <div className="flex justify-center gap-5 mt-4">
              <button
                className="h-10 text-white transition-colors duration-200 bg-transparent border-2 border-white rounded-lg w-36 hover:bg-white hover:text-gray-900"
                type="button"
                onClick=""
              >
                Create
              </button>
              <button
                className="h-10 text-white transition-colors duration-200 bg-transparent border-2 border-white rounded-lg w-36 hover:bg-white hover:text-gray-900"
                type="button"
                onClick=""
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Harvest;