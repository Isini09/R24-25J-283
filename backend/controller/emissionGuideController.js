const asyncHandler = require("express-async-handler");
const { spawn } = require("child_process");
const path = require("path");

const sendYieldDataAndProcess = asyncHandler(async (req, res) => {
  const { yield: yieldValue } = req.body;

  if (!yieldValue || isNaN(yieldValue)) {
    return res.status(400).json({ error: "Invalid yield value" });
  }

  // Step 1: Calculate total emission
  //   const totalEmission = generateTotalEmission(yieldValue);

  // Step 2: Call the Python script with totalEmission
  const pythonScript = path.join(__dirname, "../models/guide_predict.py");
  const pythonProcess = spawn("python", [pythonScript, yieldValue]);

  let result = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python STDOUT:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python STDERR:", data.toString());
    errorOutput += data.toString();
  });

  pythonProcess.on("close", (code) => {
    console.log("Python process exited with code", code);
    console.log("Final result:", result);
    console.log("Final stderr:", errorOutput);

    // if (code !== 0 || errorOutput) {
    //   return res
    //     .status(500)
    //     .json({ error: "Python script error", details: errorOutput });
    // }

    const parsedResult = JSON.parse(result);
    return res.status(200).json({
      //   yield: yieldValue,
      prediction: parsedResult.label,
    });
  });
});

// const generateTotalEmission = (yieldValue) => {
//   const electricityUsage = (yieldValue * 189) / 720;
//   const firewoodUsage = yieldValue * 1.895;

//   const electricityEmission = 0.71 * electricityUsage;
//   const firewoodEmission = (1.51 * firewoodUsage) / 720;

//   return electricityEmission + firewoodEmission;
// };

module.exports = { sendYieldDataAndProcess };
