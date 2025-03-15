import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  postDatatoModel,
} from "../../features/modelFeatures/ModelSlice";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function ForecastChart() {
  const [forecastData, setForecastData] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.model
  );

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Carbon Emission Forecast",
        data: forecastData,
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        tension: 0.4,
        pointBorderColor: "#4A90E2",
        pointBackgroundColor: "#fff",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    dispatch(postDatatoModel());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && Array.isArray(data)) {
      setForecastData(data);
      console.log(forecastData);
    }
  }, [isError, isSuccess, data, message]);

  if (isLoading) {
    return <p className="text-center">Loading forecast...</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto h-full">
      <h2 className="text-2xl font-bold text-center mb-4">
        Forecast For 12 Months
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ForecastChart;
