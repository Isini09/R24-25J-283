import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import ProductDashboard from "./pages/Product/ProductDashboard";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import ProductDetails from "./pages/Product/ProductDetails";
import AddProductForm from "./pages/Product/AddProduct";
import CarbonFootprintTrackingPage from "./pages/CorbonFootprintSystem/CatrbonFootprintTrackingPage";
import SupplierLogin from "./pages/Supplier/supplierLogin";
import UpperPanel from "./components/UpperPanel";
import SidePanel from "./components/SidePanel";
import Harvest from "./pages/HarvestManagement/HarvestManagementPage";

function App() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <Router>
      {/* ✅ Move UpperPanel & SidePanel OUTSIDE of <Routes> */}
      <UpperPanel toggleSidePanel={toggleSidePanel} />
      <SidePanel isOpen={isSidePanelOpen} toggleSidePanel={toggleSidePanel} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/product-dashboard" element={<ProductDashboard />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/product/:batchId" element={<ProductDetails />} />
        <Route path="/carbon-footprint-tracking" element={<CarbonFootprintTrackingPage />} />
        <Route path="/supplier-login" element={<SupplierLogin />} />
        <Route path="/harvest" element={<Harvest />} />
      </Routes>
    </Router>
  );
}

export default App;
