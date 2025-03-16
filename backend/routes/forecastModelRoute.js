const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");

router.post("/c02/predict", (req, res) => {
  const pythonScriptPath = path.join(
    __dirname,
    "../models/forecast_predict.py"
  );

  const pythonProcess = spawn("python", [pythonScriptPath]);

  let outputData = "";
  let errorData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorData += data.toString();
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);

    if (code === 0) {
      try {
        const parsedData = JSON.parse(outputData);

        // Check if the output is nested
        if (
          Array.isArray(parsedData) &&
          parsedData.length === 1 &&
          Array.isArray(parsedData[0])
        ) {
          res.status(200).json(parsedData[0]); // Flatten the array
        } else {
          res.status(200).json(parsedData);
        }
      } catch (err) {
        res.status(500).send(`Error parsing Python output: ${err}`);
      }
    } else {
      res.status(500).send(`Python Error: ${errorData}`);
    }
  });
});

module.exports = router;
