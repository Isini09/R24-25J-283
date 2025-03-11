import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CatrbonFootprintTrackingPage() {

  const data = {
    labels: ["Fire Woods", "Electricity", "Waste"],
    datasets: [
      {
        data: [150, 40, 70], 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], 
        hoverBackgroundColor: ["#FF4D6D", "#4A90E2", "#FFD700"],
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "60%", 
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className='w-full h-screen flex items-center justify-center gap-4 bg-black text-white'>
  <div className='flex items-center justify-center w-full h-screen'>
    <div className="w-auto mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Carbon Emission For Month</h2>
      <Doughnut data={data} options={options} />
    </div>
  </div>

  
  <div className='w-full h-screen border border-red-100'>Forecast graph and guide model</div>
</div>

  )
}

export default CatrbonFootprintTrackingPage