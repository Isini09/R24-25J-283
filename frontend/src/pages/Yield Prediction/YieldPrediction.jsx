import React, { useState } from "react";
import axios from "axios";

const YieldPrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [predictionData, setPredictionData] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedFile(response.data.filename);
      alert(response.data.message);
    } catch (error) {
      setUploadedFile(null);
      console.error("Upload error:", error);
      alert(error.data.message);
    }
  };

  const handleGetPrediction = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !uploadedFile) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/yield-predict",
        {
          startDate,
          endDate,
          file: uploadedFile,
        }
      );
      setPredictionData(response.data);
      console.log("Prediction response:", response.data);
      alert("Prediction data received successfully!");
    } catch (error) {
      setPredictionData(
        error.response?.data || "Error fetching prediction data"
      );
      console.error("Error getting prediction:", error);
      alert("Failed to get prediction data.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: 30 }}>Yield Prediction</h1>
      <div>
        <input
          type="file"
          placeholder="Enter crop name"
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
          onChange={(event) => handleFileChange(event)}
        />
      </div>
      <div>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={(event) => handleFileUpload(event)}
        >
          Upload Image
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: 20,
          }}
        >
          {" "}
          Start Date{" "}
        </h2>
        <input
          type="date"
          placeholder="dd/mm/yyyy"
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: 20 }}> End Date </h2>
        <input
          type="date"
          placeholder="dd/mm/yyyy"
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={(event) => handleGetPrediction(event)}
        >
          Get Prediction
        </button>
      </div>
      {predictionData && predictionData !== "" && (
        <div>
          <h1 style={{ fontSize: 20 }}>{predictionData}</h1>
        </div>
      )}
    </div>
  );
};

export default YieldPrediction;
