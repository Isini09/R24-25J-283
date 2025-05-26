import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleProductClick = (batchId) => {
    navigate(`/product/${batchId}`);
  };

  const handleDelete = async (batchId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${batchId}`);
      toast.success("Batch deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete batch.");
    }
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <NavBarAdmin />
      <ToastContainer />

      <div className="ml-[250px] mt-[25px] w-full py-8 px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Product Management</h2>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="flex items-center px-4 py-3 transition-colors duration-300 bg-gray-800 border border-gray-600 rounded-full shadow-lg hover:border-green-500">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="w-full text-white placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <FontAwesomeIcon icon={faSearch} className="ml-2 text-green-400" />
            </div>

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              className="flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-full shadow-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:scale-105"
            >
              <span className="mr-2 font-semibold">Add Product</span>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products
            .filter((product) => product.batchId.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <div
                key={product.batchId}
                className="p-6 transition-all duration-300 transform bg-gray-800 border border-gray-700 cursor-pointer rounded-xl hover:bg-gradient-to-br hover:from-green-700 hover:to-green-800 hover:border-green-500 hover:shadow-xl hover:scale-105 group"
                onClick={() => handleProductClick(product.batchId)}
              >
                <div className="flex flex-col items-center">
                  {/* QR Code */}
                  <div className="p-3 mb-4 bg-white rounded-lg shadow-md">
                    <img src={product.qrCode} alt="QR Code" className="w-16 h-16" />
                  </div>
                  
                  {/* Batch ID */}
                  <p className="mb-4 text-xl font-bold text-center text-white group-hover:text-green-100">
                    {product.batchId}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <button 
                      className="p-2 text-yellow-400 transition-all duration-200 rounded-full hover:text-yellow-300 hover:bg-yellow-400 hover:bg-opacity-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-lg" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.batchId);
                      }}
                      className="p-2 text-red-400 transition-all duration-200 rounded-full hover:text-red-300 hover:bg-red-400 hover:bg-opacity-20"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {products.filter((product) => product.batchId.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-lg text-gray-400">
              {search ? "No products found matching your search." : "No products available."}
            </div>
            <button
              onClick={handleAddProduct}
              className="px-6 py-3 text-white transition-all duration-300 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDashboard;