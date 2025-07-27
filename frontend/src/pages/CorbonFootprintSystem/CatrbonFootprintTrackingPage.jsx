import React, { useState } from "react";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ForecastChart from "../../components/charts/ForecastChart";
import UpperPanel from "../../components/UpperPanel";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CarbonFootprintTrackingPage() {
  const [formData, setFormData] = useState({
    totalYield: "",
  });
  const [prediction, setPrediction] = useState("");
  const [guidance, setGuidance] = useState([]);
  const [isLow, setIsLow] = useState(false);

  const ideas = [
    "Switch to renewable energy: Install solar panels, use biogas from organic waste, or purchase green electricity.",
    "Use energy-efficient machinery: Upgrade to modern, high-efficiency with variable speed drives (VSDs).",
    "Optimize drying systems: Replace old driers with fuel-efficient ones or use solar-assisted drying technologies.",
    "Improve insulation: Insulate boilers, pipes, and buildings to reduce heat loss.",
  ];

  const sendYieldData = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (!formData.totalYield) {
      alert("Please provide the total yield for the day");
      return;
    }

    console.log(formData.totalYield);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/guide-model/predict",
        { yield: formData.totalYield }
      );

      if (response.data && response.data.prediction) {
        const prediction = response.data.prediction;
        setPrediction(prediction);
        generateGuidance(prediction);
        console.log("Prediction:", guidance);
      } else {
        alert("Something went wrong with the prediction response");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Server error");
    }
  };

  const generateGuidance = (prediction) => {
    if (prediction === "High emission") {
      setIsLow(true);
      setGuidance(ideas);
    } else {
      setIsLow(false);
      setGuidance([
        "You're creating cleaner air for your community.",
        "You're preserving the climate stability that future farmers depend on.",
        "You inspire other tea producers to follow your green path.",
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated dark background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute rounded-full bg-green-600/10 top-1/4 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 -right-40 w-80 h-80 bg-emerald-600/10 mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600/10 top-1/2 left-1/2 w-60 h-60 mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <UpperPanel />

      {/* Main Content Container */}
      <div className="relative z-10 p-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text">
            CARBON FOOTPRINT CONTROL PANEL
          </h1>
          <p className="text-gray-400">
            Monitor and forecast carbon emissions for sustainable tea production
          </p>
        </div>

        {/* TOP SECTION - Daily Yield Input (Full Width) */}
        <div className="w-full mx-auto mb-8 max-w-7xl">
          <div className="p-6 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
            <h3 className="mb-4 text-xl font-semibold text-green-300">
              Daily Yield Input
            </h3>
            <form onSubmit={sendYieldData} className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="carbonInput"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Total Yield (kg)
                </label>
                <input
                  type="number"
                  id="carbonInput"
                  value={formData.totalYield}
                  name="totalYield"
                  onChange={(event) =>
                    setFormData({ totalYield: event.target.value })
                  }
                  placeholder="Enter total yield value"
                  className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-700/50 border-green-500/30 focus:outline-none focus:border-green-400/70 focus:ring-2 focus:ring-green-400/20"
                  required
                />
              </div>
              <div className="flex items-end md:w-48">
                <button
                  type="submit"
                  className="w-full px-6 py-3 font-medium text-white transition transform border rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-500/30 hover:border-green-400/50 hover:shadow-xl hover:scale-105"
                >
                  Analyze Emissions
                </button>
              </div>
            </form>
            
            {/* Prediction Display */}
            {prediction && (
              <div className="p-4 mt-6 border rounded-lg border-green-500/20 bg-gray-700/30">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {isLow ? (
                      <ErrorIcon color="error" />
                    ) : (
                      <CheckCircleOutlineIcon color="success" />
                    )}
                  </Avatar>
                  <div>
                    <span className="text-sm text-gray-300">Emission Status:</span>
                    <span className={`ml-2 text-lg font-semibold ${
                      isLow ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {prediction}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE SECTION - Forecast and Guidance (Side by Side) */}
        <div className="w-full mx-auto mb-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            
            {/* Left: Emission Forecast */}
            <div className="relative p-6 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
              <h3 className="mb-4 text-xl font-semibold text-green-300">
                Emission Forecast
              </h3>
              <div className="relative h-64">
                <ForecastChart />
                <div className="absolute w-20 h-20 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"></div>
              </div>
            </div>

            {/* Right: Guidance Section */}
            <div className="relative p-6 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
              <h3 className="mb-4 text-xl font-semibold text-green-300">
                Guidance To Reduce The Emission
              </h3>
              <div className="text-white">
                {guidance.length > 0 ? (
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: 'transparent',
                      maxHeight: '240px',
                      overflow: 'auto',
                    }}
                  >
                    {guidance.map((guide, index) => (
                      <ListItem 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          py: 1,
                          px: 0,
                        }}
                      >
                        <ListItemAvatar sx={{ minWidth: '45px' }}>
                          <Avatar sx={{ width: 30, height: 30 }}>
                            {isLow ? (
                              <ErrorIcon color="error" />
                            ) : (
                              <CheckCircleOutlineIcon color="success" />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={guide}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: 'rgb(209 213 219)',
                              fontSize: '0.9rem',
                              lineHeight: 1.4,
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <div className="py-8 text-center text-gray-400">
                    Submit yield data to get emission guidance
                  </div>
                )}
              </div>
              <div className="absolute w-16 h-16 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Doughnut Chart (Full Width) */}
        <div className="w-full mx-auto max-w-7xl">
          <div className="p-6 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
            <h3 className="mb-4 text-xl font-semibold text-green-300">
              Emission Distribution
            </h3>
            <div className="flex items-center justify-center h-64">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTrackingPage;