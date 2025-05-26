import React, { useState } from "react";
import axios from "axios";
import NavBarAdmin from "../../components/NavBarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = () => {
  const [form, setForm] = useState({
    batchId: "",
    supplierName: "",
    location: "",
    dateStarted: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/admin/add", form);
      toast.success("Product added successfully!", { position: "top-right", autoClose: 3000 });
      resetForm();
    } catch (error) {
      toast.error("Failed to add product!");
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateForm = () => {
    const { batchId, supplierName, location, dateStarted, status } = form;
    if (!batchId || !supplierName || !location || !dateStarted || !status) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setForm({
      batchId: "",
      supplierName: "",
      location: "",
      dateStarted: "",
      status: "",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Animated background elements */}
      
      {/* Floating geometric shapes */}
      <div className="absolute w-2 h-2 rounded-full top-20 left-1/4 bg-emerald-400 animate-pulse opacity-30"></div>
      <div className="absolute w-1 h-1 bg-green-300 rounded-full top-40 right-1/3 animate-bounce opacity-40"></div>
      <div className="absolute w-3 h-3 rounded-full bottom-32 left-1/3 bg-emerald-500 animate-ping opacity-20"></div>
      
      <NavBarAdmin /> 
      <ToastContainer 
        theme="dark"
        toastStyle={{
          background: 'rgba(6, 78, 59, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(52, 211, 153, 0.2)',
        }}
      /> 

      <div className="flex justify-center ml-[250px] py-[60px] px-8 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Header with modern styling */}
          <div className="relative mb-16 text-center">
            <div className="absolute w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-gradient-to-r from-emerald-400/20 to-green-400/20 blur-3xl animate-pulse"></div>
            <div className="relative z-10">
              <h1 className="mb-6 text-6xl font-black leading-tight text-transparent bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-400 bg-clip-text">
                Add New Batch
              </h1>
              <p className="max-w-md mx-auto text-xl font-light text-emerald-200/80">
                Create a new product batch with precision and care
              </p>
              <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
            </div>
          </div>

          {/* Form container with enhanced glass morphism */}
          <div className="relative p-10 overflow-hidden border shadow-2xl backdrop-blur-2xl bg-emerald-950/20 border-emerald-500/20 rounded-3xl">
            {/* Enhanced floating orbs */}
            <div className="absolute w-16 h-16 rounded-full -top-2 -right-2 bg-gradient-to-r from-emerald-400 to-green-500 blur-2xl opacity-20 animate-bounce"></div>
            <div className="absolute w-12 h-12 rounded-full -bottom-2 -left-2 bg-gradient-to-r from-green-400 to-emerald-600 blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute w-8 h-8 rounded-full opacity-25 top-1/2 right-8 bg-gradient-to-r from-emerald-300 to-green-400 blur-lg animate-ping"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8"> 
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group">
                  <label className="block mb-4 text-sm font-bold tracking-wider uppercase text-emerald-200/90">
                    Batch ID
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-6 py-4 transition-all duration-300 border text-emerald-100 bg-emerald-950/30 border-emerald-400/30 rounded-2xl placeholder-emerald-300/40 backdrop-blur-sm focus:outline-none focus:border-emerald-400/70 focus:bg-emerald-950/40 focus:shadow-lg focus:shadow-emerald-500/20 group-hover:border-emerald-400/50"
                      type="text"
                      placeholder="Enter unique batch identifier"
                      value={form.batchId}
                      onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-400/5 to-green-500/5 rounded-2xl group-hover:opacity-100"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-4 text-sm font-bold tracking-wider uppercase text-emerald-200/90">
                    Supplier Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-6 py-4 transition-all duration-300 border text-emerald-100 bg-emerald-950/30 border-emerald-400/30 rounded-2xl placeholder-emerald-300/40 backdrop-blur-sm focus:outline-none focus:border-emerald-400/70 focus:bg-emerald-950/40 focus:shadow-lg focus:shadow-emerald-500/20 group-hover:border-emerald-400/50"
                      type="text"
                      placeholder="Enter supplier company name"
                      value={form.supplierName}
                      onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-400/5 to-green-500/5 rounded-2xl group-hover:opacity-100"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="group">
                  <label className="block mb-4 text-sm font-bold tracking-wider uppercase text-emerald-200/90">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-6 py-4 transition-all duration-300 border text-emerald-100 bg-emerald-950/30 border-emerald-400/30 rounded-2xl placeholder-emerald-300/40 backdrop-blur-sm focus:outline-none focus:border-emerald-400/70 focus:bg-emerald-950/40 focus:shadow-lg focus:shadow-emerald-500/20 group-hover:border-emerald-400/50"
                      type="text"
                      placeholder="Enter production location"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-400/5 to-green-500/5 rounded-2xl group-hover:opacity-100"></div>
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-4 text-sm font-bold tracking-wider uppercase text-emerald-200/90">
                    Date Started
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-6 py-4 transition-all duration-300 border text-emerald-100 bg-emerald-950/30 border-emerald-400/30 rounded-2xl placeholder-emerald-300/40 backdrop-blur-sm focus:outline-none focus:border-emerald-400/70 focus:bg-emerald-950/40 focus:shadow-lg focus:shadow-emerald-500/20 group-hover:border-emerald-400/50"
                      type="date"
                      value={form.dateStarted}
                      onChange={(e) => setForm({ ...form, dateStarted: e.target.value })}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-400/5 to-green-500/5 rounded-2xl group-hover:opacity-100"></div>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block mb-4 text-sm font-bold tracking-wider uppercase text-emerald-200/90">
                  Current Status
                </label>
                <div className="relative">
                  <select
                    className="w-full px-6 py-4 transition-all duration-300 border appearance-none cursor-pointer text-emerald-100 bg-emerald-950/30 border-emerald-400/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:border-emerald-400/70 focus:bg-emerald-950/40 focus:shadow-lg focus:shadow-emerald-500/20 group-hover:border-emerald-400/50"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2334d399' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 1.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    <option value="" className="text-emerald-100 bg-emerald-900">Select status</option>
                    <option value="In Progress" className="text-emerald-100 bg-emerald-900">In Progress</option>
                    <option value="Completed" className="text-emerald-100 bg-emerald-900">Completed</option>
                  </select>
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-400/5 to-green-500/5 rounded-2xl group-hover:opacity-100"></div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="group relative w-full px-10 py-5 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-emerald-500/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 bg-white/10 group-hover:scale-x-100"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 mr-3 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                        Processing Batch...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Product Batch
                        <svg className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Additional visual elements */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 space-x-2 border rounded-full bg-emerald-950/30 border-emerald-400/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-300/80">Secure Batch Management System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;