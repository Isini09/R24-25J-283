import React, { useState } from "react";
import axios from "axios";

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
    <div className="bg-[#111111] h-screen">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: 50, color: "white" }}>Harvest Management</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: "50px",
        }}
      >
        <button
          style={{
            border: "2px solid",
            borderRadius: 10,
            borderColor: showHarvest ? "white" : "transparent",
            padding: 10,
            color: "white",
          }}
          onClick={() => {
            setShowPrune(false);
            setShowHarvest(true);
          }}
        >
          Harvest
        </button>
        <button
          style={{
            border: "2px solid",
            borderRadius: 10,
            borderColor: showPrune ? "white" : "transparent",
            padding: 10,
            color: "white",
          }}
          onClick={() => {
            setShowHarvest(false);
            setShowPrune(true);
          }}
        >
          Prune
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {showHarvest && (
          <form>
            <div
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 40,
                border: "2px solid",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  onChange={(event) => setBlockId(event.target.value)}
                  type="text"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Harvest Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="date"
                  onChange={(event) => setHarvestDate(event.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="button"
                  onClick={postHarvestData}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
        {showPrune && (
          <form>
            <div
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 40,
                border: "2px solid",
                borderRadius: 10,
                borderColor: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Block ID</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="text"
                  onChange={(event) => setBlockId(event.target.value)}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: 20, color: "white" }}>Prune Date</h1>
                <input
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="date"
                  onChange={(event) => setPruneDate(event.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  style={{
                    width: 200,
                    height: 40,
                    border: "2px solid",
                    borderRadius: 10,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                  }}
                  type="button"
                  onClick={postPruneData}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Harvest;
