// src/HumidityChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const HumidityChart = ({ batchId }) => {
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const fetchHumidityData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${batchId}/humidity`);
        setHumidityData(response.data);
      } catch (error) {
        console.error("Error fetching humidity data:", error);
      }
    };

    fetchHumidityData();
  }, [batchId]);

  const data = {
    labels: humidityData.map(stage => stage.stage),
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityData.map(stage => stage.humidity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Humidity Levels by Stage</h2>
      <Bar data={data} />
    </div>
  );
};

export default HumidityChart;