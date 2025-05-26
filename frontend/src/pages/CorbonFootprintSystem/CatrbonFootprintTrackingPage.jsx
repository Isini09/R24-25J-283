import React from "react";
import DoughnutChart from "../../components/charts/DoughnutChart";
import ForecastChart from "../../components/charts/ForecastChart";
import UpperPanel from "../../components/UpperPanel";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function CarbonFootprintTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Animated dark background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute rounded-full bg-green-600/10 top-1/4 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 -right-40 w-80 h-80 bg-emerald-600/10 mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600/10 top-1/2 left-1/2 w-60 h-60 mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <UpperPanel />
      
      <div className="relative z-10 flex items-start justify-center w-full min-h-screen gap-8 p-6 text-green-100">
        {/* Left Panel - Doughnut Chart and Form */}
        <div className="flex flex-col items-center justify-start w-full h-full">
          <div className="w-3/4 mx-auto">
            {/* Chart Container */}
            <div className="p-6 mb-8 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
              <h2 className="mb-6 text-2xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text">
                Carbon Emission For Month
              </h2>
              <div className="relative">
                <DoughnutChart />
                <div className="absolute w-20 h-20 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"></div>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-6 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
              <h3 className="mb-4 text-lg font-semibold text-green-300">Add Carbon Data</h3>
              <form onSubmit="" className="space-y-4">
                <div>
                  <label htmlFor="carbonInput" className="block mb-2 text-sm font-medium text-gray-300">
                    Carbon Emission Value
                  </label>
                  <input
                    type="number"
                    id="carbonInput"
                    value=""
                    placeholder="Enter carbon emission value"
                    className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition-all duration-300 border rounded-lg bg-gray-700/50 border-green-500/30 focus:outline-none focus:border-green-400/70 focus:ring-2 focus:ring-green-400/20"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 font-medium text-white transition transform border rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-500/30 hover:border-green-400/50 hover:shadow-xl hover:scale-105"
                >
                  Submit Data
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Panel - Control Panel */}
        <div className="flex flex-col w-full h-full">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text">
              CONTROL PANEL
            </h1>
            <p className="text-gray-400">Monitor and forecast carbon emissions</p>
          </div>

          {/* Forecast Chart Container */}
          <div className="w-3/4 p-6 mx-auto mb-8 transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
            <h3 className="mb-4 text-lg font-semibold text-green-300">Emission Forecast</h3>
            <div className="relative">
              <ForecastChart />
              <div className="absolute w-20 h-20 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"></div>
            </div>
          </div>

          {/* Empty Bar Chart Container */}
          <div className="w-3/4 p-6 mx-auto transition-all duration-300 border shadow-xl bg-gray-800/90 backdrop-blur-sm border-green-500/20 rounded-2xl hover:shadow-2xl hover:bg-gray-800/95 hover:border-green-400/30">
            <h3 className="mb-4 text-lg font-semibold text-green-300">Monthly Emissions Overview</h3>
            <div className="relative h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12}
                  />
                  <Tooltip/>
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)" 
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Empty Box*/}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-4xl text-gray-600">📊</div>
                  <p className="text-sm text-gray-500">No data available</p>
                </div>
              </div>
              
              <div className="absolute w-16 h-16 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTrackingPage;