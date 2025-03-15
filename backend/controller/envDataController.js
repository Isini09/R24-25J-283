const firebaseDB = require("../config/firebase-database-config");
const asyncHandler = require("express-async-handler");

const getRealTimeEnvData = asyncHandler(async (req, res) => {
  try {
    const envDataRef = firebaseDB.ref("liveData");
    const snapshot = await envDataRef.once("value");

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ error: "No real-time data available at the moment" });
    }

    const realTimeData = snapshot.val();

    res.status(200).json({ realTimeData });
  } catch (error) {
    console.error("Error fetching environment data:", error);
    res.status(500).json({ error: "Failed to retrieve environment data" });
  }
});

const getHistoryEnvData = asyncHandler(async (req, res) => {
  try {
    const historyDataRef = firebaseDB.ref("history");
    const snapshot = await historyDataRef.once("value");

    if (!snapshot.exists()) {
      return res
        .status(404)
        .json({ error: "No history data available at the moment" });
    }

    let historyData = [];
    snapshot.forEach((childSnapshot) => {
      historyData.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    res.status(200).json({ historyData });
  } catch (error) {
    console.error("Error fetching history data:", error);
    res.status(500).json({ error: "Failed to retrieve history data" });
  }
});

module.exports = { getRealTimeEnvData, getHistoryEnvData };
