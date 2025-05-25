const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
};

const getDates = asyncHandler(async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const file = req.body.file;

  res.status(200).json({
    message: "Dates received successfully",
    startDate: startDate,
    endDate: endDate,
    file: file,
  });
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);
  console.log("File:", file);
});

const yieldPredict = asyncHandler(async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const imageFile = req.body.file;

  const imagePath = path.join(__dirname, `../uploads/${imageFile}`);
  const python = spawn("python", [
    "models/yield_predict.py",
    imagePath,
    startDate,
    endDate,
  ]);

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    res.status(500).send(`Unexpected Error : ${data} `);
    console.error(`Error: ${data}`);
  });

  python.on("close", (code) => {
    res.status(200).send(result);
  });
});

module.exports = { upload, uploadImage, getDates, yieldPredict };
