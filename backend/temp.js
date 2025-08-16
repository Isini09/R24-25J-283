const { spawn } = require("child_process");

const pythonProcess = spawn("python", ["-c", "import sys; print(sys.executable)"]);

pythonProcess.stdout.on("data", (data) => {
  console.log("Python being used by Node.js:", data.toString());
});
