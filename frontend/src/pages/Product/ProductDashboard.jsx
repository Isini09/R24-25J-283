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
    <div className="flex">
      <NavBarAdmin />
      <ToastContainer />

      <div className="ml-[250px] mt-[25px] w-full  py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Product Management</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center px-4 py-2 border border-black rounded-full">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="w-full focus:outline-none"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>

            <button
              onClick={handleAddProduct}
              className="flex items-center px-6 py-2 text-white bg-green-900 rounded-full hover:bg-white hover:text-green-900 hover:border hover:border-green-900"
            >
              <span className="mr-2">Add Product</span>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-5 gap-5">
          {products
            .filter((product) => product.batchId.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <div
                key={product.batchId}
                className="p-6 transition border border-black cursor-pointer rounded-xl hover:bg-green-900 hover:text-white"
                onClick={() => handleProductClick(product.batchId)}
              >
                <div className="flex flex-col items-center">
                  <img src={product.qrCode} alt="QR Code" className="w-20 bg-white" />
                  <p className="mt-4 text-xl font-bold">{product.batchId}</p>

                  <div className="flex mt-4 gap-7">
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.batchId);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
