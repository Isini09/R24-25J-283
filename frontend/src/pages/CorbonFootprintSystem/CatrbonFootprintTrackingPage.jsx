import React from "react";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ForecastChart from "../../components/charts/ForecastChart";

function CarbonFootprintTrackingPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen gap-4 text-white bg-[#111111]">
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

        {/* Guidance [warnings, safes, dangers] */}

        {/* Form to add current waste, electricity and firewoods usages */}
        <div className="w-3/4 h-auto p-10 mx-auto mt-24 bg-white">
            
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTrackingPage;
