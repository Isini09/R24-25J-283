import React, { useEffect, useState } from "react";
import UpperPanel from "../../components/UpperPanel";

const Harvest = () => {
  const [data, setData] = useState({});
  const [blockId, setBlockId] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [pruneDate, setPruneDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Simulated API calls (replace with actual axios calls)
  const getHarvestData = async (blockId) => {
    if (!blockId) {
      alert("Please select a Block ID before fetching.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Replace with actual API call
      const response = await fetch(
        `http://localhost:5000/api/get/harvest-data/${blockId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.blockData) {
        setData(result.blockData);
      } else {
        setData({});
        alert("No data found for this block ID.");
      }
    } catch (error) {
      console.error("Error fetching harvest data:", error);
      setError("Failed to fetch data: " + error.message);
      alert("Failed to fetch data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const postHarvestData = async () => {
    if (!blockId || !harvestDate || !pruneDate) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/harvest-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blockId,
          harvestDate,
          pruningDate: pruneDate,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      }

      alert("Block data created successfully.");
      // Clear form after successful creation
      setBlockId("");
      setHarvestDate("");
      setPruneDate("");
      setData({});
    } catch (error) {
      console.error("Error posting harvest data:", error);
      setError("Error submitting data: " + error.message);
      alert("Error submitting data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateHarvestData = async () => {
    if (!blockId) {
      alert("Please select a Block ID to update.");
      return;
    }

    if (!harvestDate && !pruneDate) {
      alert("Please provide at least one date to update.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const updatePayload = {};
      if (harvestDate) updatePayload.harvestDate = harvestDate;
      if (pruneDate) updatePayload.pruningDate = pruneDate;

      const response = await fetch(
        `http://localhost:5000/api/harvest-data/${blockId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      }

      alert(result.message || "Update successful");
      // Refresh data after update
      await getHarvestData(blockId);
    } catch (error) {
      console.error("Error updating harvest data:", error);
      setError("Failed to update data: " + error.message);
      alert("Failed to update data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Populate form fields when data changes
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setHarvestDate(data.harvestDate || "");
      setPruneDate(data.pruningDate || "");
    }
  }, [data]);

  // Clear form when blockId changes
  const handleBlockIdChange = (e) => {
    const newBlockId = e.target.value;
    setBlockId(newBlockId);

    // Clear form and data when changing block ID
    if (newBlockId !== blockId) {
      setData({});
      setHarvestDate("");
      setPruneDate("");
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <UpperPanel />

      <div className="flex justify-center pt-8">
        <h1 className="text-5xl font-bold text-green-400">
          Harvest Management
        </h1>
      </div>

      {error && (
        <div className="flex justify-center mt-4">
          <div className="px-4 py-2 text-red-400 bg-red-900 border border-red-400 rounded-lg">
            {error}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <div className="p-6 bg-transparent border-2 border-white rounded-lg">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">Block ID</h1>
              <select
                className="w-48 h-10 px-3 text-green-400 bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
                onChange={handleBlockIdChange}
                value={blockId}
                disabled={loading}
              >
                <option value="">-- Select Block --</option>
                <option value="div01">div01</option>
                <option value="div02">div02</option>
                <option value="div03">div03</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">
                Harvest Date
              </h1>
              <input
                className="w-48 h-10 px-3 text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
                type="date"
                onChange={(e) => setHarvestDate(e.target.value)}
                value={harvestDate}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between gap-5">
              <h1 className="text-xl font-medium text-green-400">Prune Date</h1>
              <input
                className="w-48 h-10 px-3 text-white bg-transparent border-2 border-white rounded-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
                type="date"
                onChange={(e) => setPruneDate(e.target.value)}
                value={pruneDate}
                disabled={loading}
              />
            </div>

            <div className="flex justify-center gap-5 mt-4">
              <button
                className="h-10 text-white transition-colors duration-200 bg-transparent border-2 border-white rounded-lg w-36 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={postHarvestData}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
              <button
                className="h-10 text-white transition-colors duration-200 bg-transparent border-2 border-white rounded-lg w-36 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={updateHarvestData}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                className="h-10 text-white transition-colors duration-200 bg-transparent border-2 border-white rounded-lg w-36 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => getHarvestData(blockId)}
                disabled={loading}
              >
                {loading ? "Fetching..." : "Fetch"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display fetched data */}
      {Object.keys(data).length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold text-green-400">
              Current Data:
            </h3>
            <p className="text-white">Block ID: {data.blockId}</p>
            <p className="text-white">
              Harvest Date: {data.harvestDate || "Not set"}
            </p>
            <p className="text-white">
              Prune Date: {data.pruningDate || "Not set"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Harvest;
