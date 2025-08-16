import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faAdd, faSearch, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import NavBarAdmin from "../../components/NavBarAdmin";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
        <p className="mb-6 text-lg font-medium text-white">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-300 transition border border-gray-600 rounded hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const SupplierModal = ({ isOpen, supplier, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    supplierId: '',
    name: '',
    companyName: '',
    location: '',
    contact: '',
    certifications: '',
    ingredientsSupplied: '',
    documents: '',
    status: 'Active'
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    } else {
      setFormData({
        supplierId: '',
        name: '',
        companyName: '',
        location: '',
        contact: '',
        certifications: '',
        ingredientsSupplied: '',
        documents: '',
        status: 'Active'
      });
    }
  }, [supplier, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.supplierId || !formData.name) {
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            {supplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Supplier ID *
              </label>
              <input
                type="text"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleInputChange}
                required
                disabled={!!supplier}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500 disabled:opacity-50"
                placeholder="Enter supplier ID"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
                placeholder="Enter supplier name"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
                placeholder="Enter company name"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
                placeholder="Enter location"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
                placeholder="Enter contact information"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 form-group">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Certifications
            </label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter certifications (comma separated)"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Ingredients Supplied
            </label>
            <textarea
              name="ingredientsSupplied"
              value={formData.ingredientsSupplied}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter ingredients supplied (comma separated)"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Documents
            </label>
            <textarea
              name="documents"
              value={formData.documents}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter document URLs or descriptions"
            />
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-300 transition border border-gray-600 rounded hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit({ preventDefault: () => {} })}
              className="flex items-center gap-2 px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faSave} />
              Save Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, supplierId: null });
  const [supplierModal, setSupplierModal] = useState({ isOpen: false, supplier: null });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/supplier/list');
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        throw new Error('Failed to fetch suppliers');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      // For demo purposes, use mock data
      setSuppliers([
        {
          supplierId: 'SUP001',
          name: 'John Smith',
          companyName: 'Organic Farms Ltd',
          location: 'California, USA',
          contact: 'john@organicfarms.com',
          certifications: 'Organic, Non-GMO',
          ingredientsSupplied: 'Tomatoes, Peppers, Herbs',
          documents: 'Certificate.pdf',
          status: 'Active'
        },
        {
          supplierId: 'SUP002',
          name: 'Maria Rodriguez',
          companyName: 'Fresh Produce Co',
          location: 'Texas, USA',
          contact: 'maria@freshproduce.com',
          certifications: 'FDA Approved',
          ingredientsSupplied: 'Lettuce, Spinach, Carrots',
          documents: 'License.pdf',
          status: 'Active'
        },
        {
          supplierId: 'SUP003',
          name: 'David Wilson',
          companyName: 'Premium Ingredients Inc',
          location: 'New York, USA',
          contact: 'david@premium.com',
          certifications: 'ISO 9001, HACCP',
          ingredientsSupplied: 'Spices, Seasonings, Oils',
          documents: 'Quality_Report.pdf',
          status: 'Pending'
        },
        {
          supplierId: 'SUP004',
          name: 'Sarah Johnson',
          companyName: 'Green Valley Supplies',
          location: 'Oregon, USA',
          contact: 'sarah@greenvalley.com',
          certifications: 'Organic, Fair Trade',
          ingredientsSupplied: 'Grains, Legumes, Seeds',
          documents: 'Certification.pdf',
          status: 'Inactive'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteClick = (supplierId) => {
    setConfirmModal({ isOpen: true, supplierId });
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/supplier/list/${confirmModal.supplierId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setSuppliers(prev => prev.filter(s => s.supplierId !== confirmModal.supplierId));
        showMessage('success', 'Supplier deleted successfully!');
      } else {
        throw new Error('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      showMessage('error', 'Failed to delete supplier.');
    } finally {
      setConfirmModal({ isOpen: false, supplierId: null });
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal({ isOpen: false, supplierId: null });
  };

  const handleAddSupplier = () => {
    setSupplierModal({ isOpen: true, supplier: null });
  };

  const handleEditSupplier = (supplier) => {
    setSupplierModal({ isOpen: true, supplier });
  };

  const handleSaveSupplier = async (formData) => {
    try {
      const isEdit = !!supplierModal.supplier;
      const url = isEdit ? `/supplier/list/${formData.supplierId}` : '/supplier/add';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const savedSupplier = await response.json();
        
        if (isEdit) {
          setSuppliers(prev => prev.map(s => 
            s.supplierId === formData.supplierId ? savedSupplier : s
          ));
          showMessage('success', 'Supplier updated successfully!');
        } else {
          setSuppliers(prev => [...prev, savedSupplier]);
          showMessage('success', 'Supplier added successfully!');
        }
        
        setSupplierModal({ isOpen: false, supplier: null });
      } else {
        throw new Error('Failed to save supplier');
      }
    } catch (error) {
      console.error('Error saving supplier:', error);
      showMessage('error', 'Failed to save supplier.');
    }
  };

  const handleCancelSupplier = () => {
    setSupplierModal({ isOpen: false, supplier: null });
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(search.toLowerCase()) ||
    supplier.supplierId.toLowerCase().includes(search.toLowerCase()) ||
    supplier.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={`Are you sure you want to delete supplier ${confirmModal.supplierId}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Supplier Modal */}
      <SupplierModal
        isOpen={supplierModal.isOpen}
        supplier={supplierModal.supplier}
        onSave={handleSaveSupplier}
        onCancel={handleCancelSupplier}
      />

      <div className="ml-[250px] mt-[25px] w-full py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded border ${
            message.type === 'success' 
              ? 'bg-green-800 text-green-200 border-green-600' 
              : 'bg-red-800 text-red-200 border-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <NavBarAdmin/>
          <h2 className="text-2xl font-bold text-white">Supplier Management</h2>
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="flex items-center px-4 py-2 bg-gray-800 border border-gray-600 rounded-full">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={handleSearchChange}
                className="w-full text-white placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>

            {/* Add Supplier Button */}
            <button
              onClick={handleAddSupplier}
              className="flex items-center px-6 py-2 text-white transition bg-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border hover:border-green-600"
            >
              <span className="mr-2">Add Supplier</span>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>

        {/* Supplier Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white">Loading suppliers...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.supplierId}
                className="p-6 transition bg-gray-800 border border-gray-700 cursor-pointer rounded-xl hover:bg-green-600 hover:text-white group"
              >
                <div className="flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-white">
                        {supplier.name}
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-green-100">
                        {supplier.companyName}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      supplier.status === 'Active' 
                        ? 'bg-green-700 text-green-200' 
                        : supplier.status === 'Pending'
                        ? 'bg-yellow-700 text-yellow-200'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {supplier.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-20 font-medium text-gray-300 group-hover:text-green-100">ID:</span>
                      <span className="text-white group-hover:text-white">{supplier.supplierId}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 font-medium text-gray-300 group-hover:text-green-100">Location:</span>
                      <span className="text-white truncate group-hover:text-white">{supplier.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-20 font-medium text-gray-300 group-hover:text-green-100">Contact:</span>
                      <span className="text-white truncate group-hover:text-white">{supplier.contact}</span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  {supplier.ingredientsSupplied && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-green-100">Ingredients:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.ingredientsSupplied.split(',').slice(0, 3).map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded group-hover:bg-green-700 group-hover:text-green-100"
                          >
                            {ingredient.trim()}
                          </span>
                        ))}
                        {supplier.ingredientsSupplied.split(',').length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-300 bg-gray-700 rounded group-hover:bg-green-700 group-hover:text-green-100">
                            +{supplier.ingredientsSupplied.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center gap-4 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSupplier(supplier);
                      }}
                      className="text-yellow-400 hover:text-yellow-300 group-hover:text-yellow-200"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(supplier.supplierId);
                      }}
                      className="text-red-400 hover:text-red-300 group-hover:text-red-200"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredSuppliers.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl text-gray-600">🏢</div>
            <p className="mb-2 text-xl text-gray-400">No suppliers found</p>
            <p className="text-gray-500">
              {search ? "Try adjusting your search terms" : "Start by adding your first supplier"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;