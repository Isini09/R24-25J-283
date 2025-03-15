import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    labels: ["Fire Woods", "Electricity", "Waste"],
    datasets: [
      {
        data: [150, 40, 70],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#93032E", "#3083DC", "#FFBA08"],
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
  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
