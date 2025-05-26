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
    "Implement energy audits: Regularly audit to identify energy wastage and areas of improvement.",
  ];

  const sendYieldData = async () => {
    if (!formData.totalYield) {
      alert("Please provide the total yield for the day");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/guide-model/predict",
        { totalYield: formData.totalYield }
      );

      if (response.data && response.data.prediction) {
        const prediction = response.data.prediction;
        setPrediction(prediction);
        generateGuidance(prediction);
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
        "You’re creating cleaner air for your community.",
        "You’re preserving the climate stability that future farmers depend on.",
        "You inspire other tea producers to follow your green path.",
      ]);
    }
  };
  return (
    <div>
      <UpperPanel />
      <div className="flex items-center justify-center w-full h-screen gap-4 text-black">
        <div className="flex items-center justify-center w-full h-screen">
          <div className="w-2/4 mx-auto">
            {/* Increased width for the chart container */}
            <h2 className="mb-4 text-2xl font-bold text-center">
              Carbon Emission For Month
            </h2>
            <DoughnutChart />
          </div>
        </div>

        <div className="flex flex-col w-full h-screen">
          <div className="mt-10 mb-20 text-3xl font-bold text-center">
            CONTROL PANEL
          </div>
          <div className="w-3/4 mx-auto">
            {/* Increased width for the chart container */}
            <ForecastChart />
          </div>

          {/* Guidance Section */}
          <div className="w-3/4 h-auto p-10 mx-auto mt-10 bg-white flex flex-col">
            {guidance.length > 0 && (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 600,
                  bgcolor: "background.paper",
                  mb: 1,
                }}
              >
                {guidance.map((guide, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        {isLow ? (
                          <CheckCircleOutlineIcon color="success" />
                        ) : (
                          <ErrorIcon color="error" />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={guide} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTrackingPage;
