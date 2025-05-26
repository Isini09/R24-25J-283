import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarAdmin from "../../components/NavBarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Confirm Modal Component
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <p className="mb-6 text-lg font-medium text-gray-800">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handlers
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (batchId) => {
    navigate(`/edit-product/${batchId}`);
  };

  const handleDeleteClick = (batchId) => {
    setSelectedBatchId(batchId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/products/${selectedBatchId}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product.");
    } finally {
      setModalOpen(false);
      setSelectedBatchId(null);
    }
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setSelectedBatchId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBarAdmin />
      <ToastContainer />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        message={`Are you sure you want to delete batch ${selectedBatchId}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <div className="ml-[250px] mt-[25px] w-full px-10 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Search Box */}
            <div className="flex items-center px-4 py-2 bg-white border border-gray-400 rounded-full">
              <input
                type="text"
                placeholder="Search by batch ID"
                value={search}
                onChange={handleSearchChange}
                className="text-sm bg-transparent focus:outline-none md:text-base"
              />
              <FontAwesomeIcon icon={faSearch} className="ml-2 text-gray-600" />
            </div>

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-6 py-2 text-white transition bg-green-700 rounded-full hover:bg-white hover:text-green-700 hover:border hover:border-green-700"
            >
              <span>Add Product</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow">
          <table className="min-w-full text-left text-gray-700">
            <thead className="font-semibold bg-gray-200">
              <tr>
                <th className="px-6 py-3">QR Code</th>
                <th className="px-6 py-3">Batch ID</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Date Started</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.batchId.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <tr key={product.batchId} className="border-t hover:bg-green-50">
                    <td className="px-6 py-4">
                      <img src={product.qrCode} alt="QR Code" className="object-contain w-16 h-16" />
                    </td>
                    <td className="px-6 py-4 font-medium">{product.batchId}</td>
                    <td className="px-6 py-4">{product.location}</td>
                    <td className="px-6 py-4">{product.dateStarted}</td>
                    <td className="px-6 py-4">{product.status}</td>
                    <td className="px-6 py-4 space-x-4 text-right">
                      <button
                        onClick={() => handleEditProduct(product.batchId)}
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.batchId)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
