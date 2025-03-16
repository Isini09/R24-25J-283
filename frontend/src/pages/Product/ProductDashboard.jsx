import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarAdmin from '../../components/NavBarAdmin'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  // Fetch all records
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleProductClick = (batchId) => {
    navigate(`/product/${batchId}`); // Navigate to the Product Details page
  };

  const handleDelete = async (batchId) => {
    try {
      // Use the correct route `/api/admin/:batchId` without `/delete`
      await axios.delete(`http://localhost:5000/admin/${batchId}`);
      fetchProducts(); // Refresh the list after delete
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  const handleAddProduct = () => {
    navigate("/add-product"); 
  };

  return (
    
    <div className="flex">
      <NavBarAdmin/>
      <div className="ml-[250px] mt-[40px]">

        <div className="flex">
          <div className="text-2xl mb-[40px] font-bold">
            Product Management
          </div>
          </div>
          <div className="flex items-center justify-between mb-10">
            <div className="px-4 py-1 border border-black rounded-full">
              <div className="flex h-[40px] w-[400px] gap-3 ">
                <input className="w-full px-3 focus:outline-none"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                />
                <FontAwesomeIcon className="mt-auto mb-auto ml-auto" icon={faSearch}/>
              </div>
            </div>

            <div className="flex w-40 h-10 gap-3 px-6 text-white bg-green-900 rounded-full cursor-pointer hover:bg-white hover:text-green-900 hover:border hover:border-green-900">
            <div onClick={handleAddProduct} className="mt-auto mb-auto">AddProduct</div>
            <FontAwesomeIcon className="mt-auto mb-auto" icon = {faAdd}/>
            </div>
            
          </div>

        <div className="grid w-[1225px] grid-cols-5 gap-5">
        {products
          .filter((product) =>
            product.batchId.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div
              key={product.batchId}
              className="product-tile"
              onClick={() => handleProductClick(product.batchId)} // Navigate to Product Details page
            >
              <div className="flex flex-col items-center border border-black py-7 hover:bg-green-900 hover:text-white rounded-xl">
              <div className="w-20 bg-white">
                <img
                  src={product.qrCode} // Use the QR code URL from the product or fallback to placeholder
                  alt="QR code"
                  className="qr-code"
                />
              </div>
              <div className="mt-4 text-2xl font-bold">
                {product.batchId}
                
                <div className="flex mt-4 gap-7">
                  <div onClick={() => console.log("Update product")} className="cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                  
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent product click handler
                      handleDelete(product.batchId);
                    }}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  )
};

export default ProductDashboard;
