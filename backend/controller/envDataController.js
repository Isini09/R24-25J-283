const firebaseDB = require('../config/firebase-database-config');
const asyncHandler = require('express-async-handler');

const getRealTimeEnvData = asyncHandler(async (req, res) => {
    try {
        const envDataRef = firebaseDB.ref("liveData"); 
        const snapshot = await envDataRef.once("value");

        if (!snapshot.exists()) {
            return res.status(404).json({ error: "No real-time data available at the moment" });
        }

        const realTimeData = snapshot.val(); 

        res.status(200).json({ realTimeData });
    } catch (error) {
        console.error("Error fetching environment data:", error);
        res.status(500).json({ error: "Failed to retrieve environment data" });
    }
});

module.exports = { getRealTimeEnvData };
