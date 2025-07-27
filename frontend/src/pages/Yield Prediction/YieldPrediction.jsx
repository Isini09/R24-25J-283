import React, { useState } from "react";
import UpperPanel from "../../components/UpperPanel";



const YieldPrediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [predictionData, setPredictionData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Reset uploaded file when new file is selected
    setUploadedFile(null);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    // Simulate file upload with FormData
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const mockResponse = {
        data: {
          filename: `uploaded_${selectedFile.name}`,
          message: "File uploaded successfully!"
        }
      };
      
      setUploadedFile(mockResponse.data.filename);
      alert(mockResponse.data.message);
    } catch (error) {
      setUploadedFile(null);
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetPrediction = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !uploadedFile) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setIsAnalyzing(true);
    setPredictionData(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock prediction response
      const mockPredictionResponse = {
        data: {
          predictedYield: "2,850 kg/hectare",
          confidence: "87%",
          factors: [
            "Optimal soil moisture detected",
            "Healthy crop density observed",
            "Favorable weather conditions predicted",
            "No pest or disease indicators found"
          ],
          recommendations: [
            "Continue current irrigation schedule",
            "Apply nitrogen fertilizer in 2 weeks",
            "Monitor for early blight symptoms",
            "Harvest timing: 45-50 days from now"
          ]
        }
      };
      
      setPredictionData(mockPredictionResponse.data);
      console.log("Prediction response:", mockPredictionResponse.data);
      alert("Prediction data received successfully!");
    } catch (error) {
      setPredictionData("Error fetching prediction data");
      console.error("Error getting prediction:", error);
      alert("Failed to get prediction data.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <UpperPanel/>

      <div className="flex min-h-screen py-8 bg-gray-900">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center w-1/2 p-4">
          <div className="w-full max-w-md mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-center text-green-400">
              Yield Prediction
            </h1>
            
            <div className="space-y-6">
              {/* File Upload Section */}
              <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                <h2 className="mb-4 text-xl font-semibold text-green-300">
                  Upload Crop Image
                </h2>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-400">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                  <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile || isUploading}
                    className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      "Upload Image"
                    )}
                  </button>
                  {uploadedFile && !isUploading && (
                    <div className="flex items-center text-sm text-green-400">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      File uploaded: {uploadedFile}
                    </div>
                  )}
                </div>
              </div>

              {/* Date Selection */}
              <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                <h2 className="mb-4 text-xl font-semibold text-green-300">
                  Prediction Period
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      End Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-3 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handleGetPrediction}
                disabled={!startDate || !endDate || !uploadedFile || isAnalyzing}
                className="flex items-center justify-center w-full px-6 py-4 text-lg font-bold text-white transition-colors duration-200 transform bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-6 h-6 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  "Get Prediction"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Prediction Results */}
        <div className="w-1/2 p-8 bg-gray-800 border-l border-gray-700">
          <div className="flex flex-col w-full h-full max-w-md mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center text-green-400">
              Prediction Results
            </h2>
            
            {!predictionData && !isAnalyzing && (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-lg">Upload an image and select dates to see predictions</p>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-green-400 rounded-full animate-spin"></div>
                  <p className="text-lg text-green-400">Analyzing your data...</p>
                  <p className="mt-2 text-sm text-gray-400">This may take a few moments</p>
                </div>
              </div>
            )}

            {predictionData && typeof predictionData === 'object' && (
              <div className="flex-1 space-y-6">
                {/* Main Prediction */}
                <div className="p-6 text-white rounded-lg bg-gradient-to-r from-green-600 to-green-700">
                  <h3 className="mb-2 text-xl font-bold">Predicted Yield</h3>
                  <p className="text-3xl font-bold">{predictionData.predictedYield}</p>
                  <p className="mt-2 text-green-100">Confidence: {predictionData.confidence}</p>
                </div>

                {/* Key Factors */}
                <div className="p-6 bg-gray-700 border border-gray-600 rounded-lg">
                  <h3 className="mb-4 text-lg font-semibold text-green-300">Key Factors</h3>
                  <ul className="space-y-2">
                    {predictionData.factors?.map((factor, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="p-6 bg-gray-700 border border-gray-600 rounded-lg">
                  <h3 className="mb-4 text-lg font-semibold text-green-300">Recommendations</h3>
                  <ul className="space-y-2">
                    {predictionData.recommendations?.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {predictionData && typeof predictionData === 'string' && (
              <div className="flex items-center justify-center flex-1">
                <div className="p-6 text-center bg-gray-700 border border-gray-600 rounded-lg">
                  <p className="text-lg text-red-400">{predictionData}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;