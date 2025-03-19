import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductDashboard from "./pages/Product/ProductDashboard";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import ProductDetails from "./pages/Product/ProductDetails";
import AddProductForm from "./pages/Product/AddProduct";
import CarbonFootprintTrackingPage from "./pages/CorbonFootprintSystem/CatrbonFootprintTrackingPage";
import UpperPanel from "./components/UpperPanel";
import Harvest from "./pages/HarvestManagement/HarvestManagementPage";

function App() {
  return (
    <Router>
      <UpperPanel />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/product-dashboard" element={<ProductDashboard />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/product/:batchId" element={<ProductDetails />} />
        <Route
          path="/carbon-footprint-tracking"
          element={<CarbonFootprintTrackingPage />}
        />
        <Route path="/harvest" element={<Harvest />} />
      </Routes>
    </Router>
  );
}

export default App;
