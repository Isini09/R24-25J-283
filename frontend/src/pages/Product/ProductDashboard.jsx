import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faSearch, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm p-6 bg-gray-800 border rounded-lg shadow-2xl border-green-500/30 backdrop-blur-sm">
        <p className="mb-6 text-lg font-medium text-green-100">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-300 transition border border-gray-600 rounded bg-gray-700/50 hover:bg-gray-600 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white transition bg-red-600 border border-red-500 rounded hover:bg-red-700"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border rounded-lg shadow-2xl border-green-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6 border-b border-green-500/20">
          <h3 className="text-xl font-semibold text-green-100">
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
              <label className="block mb-2 text-sm font-medium text-green-300">
                Supplier ID *
              </label>
              <input
                type="text"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleInputChange}
                required
                disabled={!!supplier}
                className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20 disabled:opacity-50"
                placeholder="Enter supplier ID"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-green-300">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="Enter supplier name"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-green-300">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="Enter company name"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-green-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="Enter location"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-green-300">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                placeholder="Enter contact information"
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-2 text-sm font-medium text-green-300">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-green-100 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 form-group">
            <label className="block mb-2 text-sm font-medium text-green-300">
              Certifications
            </label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter certifications (comma separated)"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-green-300">
              Ingredients Supplied
            </label>
            <textarea
              name="ingredientsSupplied"
              value={formData.ingredientsSupplied}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter ingredients supplied (comma separated)"
            />
          </div>
          
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-green-300">
              Documents
            </label>
            <textarea
              name="documents"
              value={formData.documents}
              onChange={handleInputChange}
              rows="2"
              className="w-full px-4 py-3 text-green-100 placeholder-gray-400 transition border rounded-lg bg-gray-700/50 border-green-500/30 focus:border-green-400/70 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              placeholder="Enter document URLs or descriptions"
            />
          </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-300 transition border border-gray-600 rounded bg-gray-700/50 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit({ preventDefault: () => {} })}
              className="flex items-center gap-2 px-6 py-3 text-white transition transform border rounded shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-500/30 hover:border-green-400/50 hover:shadow-xl hover:scale-105"
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
      {/* Animated dark background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute rounded-full bg-green-600/10 top-1/4 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 -right-40 w-80 h-80 bg-emerald-600/10 mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

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

      <div className="relative z-10 w-full px-10 py-8">
        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-600/20 text-green-400 border-green-400/30' 
              : 'bg-red-600/20 text-red-400 border-red-400/30'
          }`}>
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text">
              Supplier Management
            </h2>
            <p className="text-gray-400">Manage your suppliers and vendor relationships</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            {/* Search Box */}
            <div className="flex items-center w-full px-4 py-3 transition-all duration-300 border rounded-full bg-gray-800/90 border-green-500/30 md:w-auto backdrop-blur-sm hover:border-green-400/50 focus-within:border-green-400/70">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={handleSearchChange}
                className="w-full text-sm text-green-100 placeholder-gray-400 bg-transparent focus:outline-none md:text-base"
              />
              <FontAwesomeIcon icon={faSearch} className="ml-2 text-green-400" />
            </div>

            {/* Add Supplier Button */}
            <button
              onClick={handleAddSupplier}
              className="flex items-center gap-2 px-6 py-3 text-white transition transform border rounded-full shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-500/30 hover:border-green-400/50 hover:shadow-xl hover:scale-105"
            >
              <span className="font-medium">Add Supplier</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* Supplier List View */}
        <div className="overflow-hidden border shadow-2xl bg-gray-800/90 border-green-500/20 rounded-2xl backdrop-blur-sm">
          {loading ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl text-gray-600">⏳</div>
              <p className="text-xl text-gray-400">Loading suppliers...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-green-500/20">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Supplier ID</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Company</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Location</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Contact</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-green-300 uppercase">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wider text-right text-green-300 uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-green-500/10">
                  {filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.supplierId}
                      className="transition-all duration-300 bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-emerald-600/20 hover:border-l-4 hover:border-l-green-400 group"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-100 group-hover:text-green-300">
                          {supplier.supplierId}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-green-200">
                        {supplier.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-green-200">
                        {supplier.companyName}
                      </td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-green-200">
                        {supplier.location}
                      </td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-green-200">
                        {supplier.contact}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          supplier.status === 'Active' 
                            ? 'bg-green-600/20 text-green-400 border-green-400/30' 
                            : supplier.status === 'Pending'
                            ? 'bg-yellow-600/20 text-yellow-400 border-yellow-400/30'
                            : 'bg-gray-600/20 text-gray-400 border-gray-400/30'
                        }`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditSupplier(supplier)}
                            className="p-2 text-blue-400 transition-all duration-300 border border-transparent rounded-lg hover:text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/30"
                            title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(supplier.supplierId)}
                            className="p-2 text-red-400 transition-all duration-300 border border-transparent rounded-lg hover:text-red-300 hover:bg-red-500/20 hover:border-red-400/30"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredSuppliers.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl text-gray-600">🏢</div>
              <p className="mb-2 text-xl text-gray-400">No suppliers found</p>
              <p className="text-gray-500">
                {search ? "Try adjusting your search terms" : "Start by adding your first supplier"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;