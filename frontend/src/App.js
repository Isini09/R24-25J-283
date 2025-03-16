import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import ProductDashboard from './pages/Product/ProductDashboard';
import Dashboard from './pages/AdminDashboard/Dashboard';
import ProductDetails from './pages/Product/ProductDetails';
import AddProductForm from './pages/Product/AddProduct';
import CatrbonFootprintTrackingPage from './pages/CorbonFootprintSystem/CatrbonFootprintTrackingPage';
import SupplierLogin from './pages/Supplier/supplierLogin';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin-dashboard" element={<Dashboard/>} /> {/* Admin Dashboard */}
        <Route path="/product-dashboard" element={<ProductDashboard/>} /> {/* Admin Dashboard */}
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/product/:batchId" element={<ProductDetails />} /> {/* Product Details */}
        <Route path='/carbon-footprint-tracking' element={<CatrbonFootprintTrackingPage/>}/>
        <Route path="/supplier-login" element={<SupplierLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
