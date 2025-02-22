import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarAdmin from '../../components/NavBarAdmin';

const ProductDetails = () => {
  const { batchId } = useParams(); // Get batchId from URL
  const [product, setProduct] = useState(null);
  const [dailyData, setDailyData] = useState({
    moistureContent: "",
    caffeineContent: "",
  });
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [editMode, setEditMode] = useState(false); // To manage edit state for product details
  const [productDetails, setProductDetails] = useState({
    flavor: "",
    supplierName: "",
    location: "",
    moistureContent: "",
    caffeineContent: "",
  });

  // Fetch product details and daily data
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:5000/api/admin/${batchId}`
        );
        setProduct(productResponse.data);
        setProductDetails({
          flavor: productResponse.data.flavor,
          supplierName: productResponse.data.supplierName,
          location: productResponse.data.location,
          moistureContent: productResponse.data.moistureContent,
          caffeineContent: productResponse.data.caffeineContent,
        });

        const dailyResponse = await axios.get(
          `http://localhost:5000/api/admin/daily/${batchId}`
        );
        setDailyUpdates(dailyResponse.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [batchId]);

  // Handle daily data form input changes
  const handleDailyDataChange = (e) => {
    const { name, value } = e.target;
    setDailyData({ ...dailyData, [name]: value });
  };

  // Handle form submission for adding daily data
  const handleAddDailyData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/admin/add-daily/${batchId}`,
        dailyData
      );
      alert("Daily data added successfully!");
      setDailyData({
        moistureContent: "",
        caffeineContent: "",
      });

      // Re-fetch the daily data after adding a new entry
      const dailyResponse = await axios.get(
        `http://localhost:5000/api/admin/daily/${batchId}`
      );
      setDailyUpdates(dailyResponse.data);
    } catch (error) {
      console.error("Error adding daily data:", error);
    }
  };

  // Handle product details form input changes
  const handleProductDetailChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  // Handle update product details
  const handleUpdateProductDetails = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await axios.put(
        `http://localhost:5000/api/admin/${batchId}`,
        productDetails
      );
      setProduct(updatedProduct.data); // Update the product details state with the response
      setEditMode(false); // Exit edit mode
      alert("Product details updated successfully!");
    } catch (error) {
      console.error("Error updating product details:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex">
      <NavBarAdmin/>
      <div className="ml-[250px] mt-[40px] w-screen">
        <div className="font-bold text-2xl mb-[40px]">Product Details</div>
        <div className="flex gap-24">
        {!editMode ? (
            <>
              <div className="flex flex-col gap-3 mb-10">
              <div className="text-xl font-bold">
                Batch ID: {product.batchId}
              </div>
              <div>
                Flavor: {product.flavor}
              </div>
              <div>
                Supplier Name: {product.supplierName}
              </div>
              <div>
                Location: {product.location}
              </div>
              <div>
                Moisture Content: {product.moistureContent}%
              </div>
              <div>
                Caffeine Content: {product.caffeineContent}%
              </div>
              </div>
              <div>
              <img className="w-[200px] h-[200px]" src={product.qrCode}/>
              </div>
              <div><button onClick={() => setEditMode(true)}>Edit Product</button></div>
            </>
          ) : (
            <form onSubmit={handleUpdateProductDetails}>
              <input
                type="text"
                name="flavor"
                value={productDetails.flavor}
                onChange={handleProductDetailChange}
                placeholder="Flavor"
              />
              <input
                type="text"
                name="supplierName"
                value={productDetails.supplierName}
                onChange={handleProductDetailChange}
                placeholder="Supplier Name"
              />
              <input
                type="text"
                name="location"
                value={productDetails.location}
                onChange={handleProductDetailChange}
                placeholder="Location"
              />
              <input
                type="number"
                name="moistureContent"
                value={productDetails.moistureContent}
                onChange={handleProductDetailChange}
                placeholder="Moisture Content (%)"
              />
              <input
                type="number"
                name="caffeineContent"
                value={productDetails.caffeineContent}
                onChange={handleProductDetailChange}
                placeholder="Caffeine Content (%)"
              />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </form>
          )}

        </div>
        <div className="flex gap-6">
          <div className="w-[200px] h-[200px] border border-black rounded-xl">Box 1</div>
          <div className="w-[200px] h-[200px] border border-black rounded-xl">Box 1</div>
          <div className="w-[200px] h-[200px] border border-black rounded-xl">Box 1</div>
          <div className="w-[200px] h-[200px] border border-black rounded-xl">Box 1</div>
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;
