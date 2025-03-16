import React from "react";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ForecastChart from "../../components/charts/ForecastChart";

function CarbonFootprintTrackingPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4 bg-black text-white">
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-2/4 mx-auto">
          {/* Increased width for the chart container */}
          <h2 className="text-2xl font-bold text-center mb-4">
            Carbon Emission For Month
          </h2>
          <DoughnutChart />
        </div>
      </div>

      <div className="w-full h-screen flex flex-col">
        <div className="text-center text-3xl font-bold mb-20 mt-10">
          CONTROL PANEL
        </div>
        <div className="w-3/4 mx-auto">
          {/* Increased width for the chart container */}
          <ForecastChart />
        </div>

        {/* Guidance [warnings, safes, dangers] */}

        {/* Form to add current waste, electricity and firewoods usages */}
        <div className="w-3/4 mx-auto mt-24 h-auto p-10 bg-white">
            
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTrackingPage;
