// import React, { useState, useEffect } from 'react';
// import { Search, Plus, Edit, Trash2, Save, X, Building, Phone, Mail, MapPin, FileText, Award, Package } from 'lucide-react';
// import NavbarAdmin from '../../components/NavBarAdmin'

// const SupplierCRUD = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingSupplier, setEditingSupplier] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     supplierId: '',
//     name: '',
//     companyName: '',
//     location: '',
//     contact: {
//       email: '',
//       phone: '',
//       address: ''
//     },
//     certifications: [],
//     ingredientsSupplied: [],
//     documents: [],
//     status: 'Active'
//   });

//   const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];

//   // API Base URL - adjust this to match your backend
//   const API_BASE = 'http://localhost:3000/api'; // Update this to your actual API base URL

//   const filteredSuppliers = suppliers.filter(supplier =>
//     supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     supplier.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     supplier.supplierId?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Fetch all suppliers
//   const fetchSuppliers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE}/supplier`);
//       if (response.ok) {
//         const data = await response.json();
//         setSuppliers(data);
//       } else {
//         console.error('Failed to fetch suppliers');
//       }
//     } catch (error) {
//       console.error('Error fetching suppliers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load suppliers on component mount
//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       supplierId: '',
//       name: '',
//       companyName: '',
//       location: '',
//       contact: {
//         email: '',
//         phone: '',
//         address: ''
//       },
//       certifications: [],
//       ingredientsSupplied: [],
//       documents: [],
//       status: 'Active'
//     });
//     setEditingSupplier(null);
//   };

//   const openModal = (supplier = null) => {
//     if (supplier) {
//       setFormData({
//         supplierId: supplier.supplierId || '',
//         name: supplier.name || '',
//         companyName: supplier.companyName || '',
//         location: supplier.location || '',
//         contact: supplier.contact || { email: '', phone: '', address: '' },
//         certifications: supplier.certifications || [],
//         ingredientsSupplied: supplier.ingredientsSupplied || [],
//         documents: supplier.documents || [],
//         status: supplier.status || 'Active'
//       });
//       setEditingSupplier(supplier);
//     } else {
//       resetForm();
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('contact.')) {
//       const contactField = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         contact: {
//           ...prev.contact,
//           [contactField]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleArrayChange = (field, value) => {
//     const items = value.split(',').map(item => item.trim()).filter(item => item);
//     setFormData(prev => ({ ...prev, [field]: items }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editingSupplier) {
//         // Update existing supplier
//         const response = await fetch(`${API_BASE}/supplier/${editingSupplier._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           const updatedSupplier = await response.json();
//           setSuppliers(suppliers.map(supplier =>
//             supplier._id === editingSupplier._id ? updatedSupplier : supplier
//           ));
//         } else {
//           console.error('Failed to update supplier');
//         }
//       } else {
//         // Create new supplier
//         const response = await fetch(`${API_BASE}/supplier/add`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           const newSupplier = await response.json();
//           setSuppliers([...suppliers, newSupplier]);
//         } else {
//           const error = await response.json();
//           console.error('Failed to create supplier:', error);
//           alert(error.error || 'Failed to create supplier');
//         }
//       }
//       closeModal();
//     } catch (error) {
//       console.error('Error saving supplier:', error);
//       alert('Error saving supplier');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (supplier) => {
//     if (window.confirm(`Are you sure you want to delete ${supplier.name}?`)) {
//       setLoading(true);
//       try {
//         const response = await fetch(`${API_BASE}/supplier/${supplier._id}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           setSuppliers(suppliers.filter(s => s._id !== supplier._id));
//         } else {
//           console.error('Failed to delete supplier');
//         }
//       } catch (error) {
//         console.error('Error deleting supplier:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <NavbarAdmin/>
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="p-8 mb-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
//           <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
//                 Supplier Management
//               </h1>
//               <p className="mt-2 text-gray-600">Manage your supplier database with ease</p>
//             </div>
            
//             <div className="flex flex-col gap-4 sm:flex-row">
//               <div className="relative">
//                 <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//                 <input
//                   type="text"
//                   placeholder="Search suppliers..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-80"
//                 />
//               </div>
              
//               <button
//                 onClick={() => openModal()}
//                 className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Supplier
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Suppliers Grid */}
//         {loading && (
//           <div className="py-12 text-center">
//             <div className="inline-block w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
//             <p className="mt-4 text-gray-600">Loading suppliers...</p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredSuppliers.map((supplier) => (
//             <div key={supplier._id} className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h3 className="mb-1 text-xl font-bold text-gray-900">{supplier.name}</h3>
//                     <p className="text-sm text-gray-600">ID: {supplier.supplierId}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => openModal(supplier)}
//                       className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(supplier)}
//                       className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Building className="w-4 h-4" />
//                     <span className="text-sm">{supplier.companyName || 'N/A'}</span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <MapPin className="w-4 h-4" />
//                     <span className="text-sm">{supplier.location || 'N/A'}</span>
//                   </div>
                  
//                   {supplier.contact?.email && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Mail className="w-4 h-4" />
//                       <span className="text-sm">{supplier.contact.email}</span>
//                     </div>
//                   )}
                  
//                   {supplier.contact?.phone && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Phone className="w-4 h-4" />
//                       <span className="text-sm">{supplier.contact.phone}</span>
//                     </div>
//                   )}

//                   {supplier.ingredientsSupplied && supplier.ingredientsSupplied.length > 0 && (
//                     <div className="flex items-start gap-2 text-gray-600">
//                       <Package className="w-4 h-4 mt-0.5" />
//                       <div className="text-sm">
//                         <span className="font-medium">Supplies:</span>
//                         <div className="flex flex-wrap gap-1 mt-1">
//                           {supplier.ingredientsSupplied.slice(0, 3).map((ingredient, idx) => (
//                             <span key={idx} className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-md">
//                               {ingredient}
//                             </span>
//                           ))}
//                           {supplier.ingredientsSupplied.length > 3 && (
//                             <span className="text-xs text-gray-500">+{supplier.ingredientsSupplied.length - 3} more</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {supplier.certifications && supplier.certifications.length > 0 && (
//                     <div className="flex items-start gap-2 text-gray-600">
//                       <Award className="w-4 h-4 mt-0.5" />
//                       <div className="text-sm">
//                         <span className="font-medium">Certifications:</span>
//                         <div className="flex flex-wrap gap-1 mt-1">
//                           {supplier.certifications.slice(0, 2).map((cert, idx) => (
//                             <span key={idx} className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-md">
//                               {cert}
//                             </span>
//                           ))}
//                           {supplier.certifications.length > 2 && (
//                             <span className="text-xs text-gray-500">+{supplier.certifications.length - 2} more</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="pt-4 mt-4 border-t border-gray-100">
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                     supplier.status === 'Active' ? 'bg-green-100 text-green-800' :
//                     supplier.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
//                     supplier.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {supplier.status}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredSuppliers.length === 0 && !loading && (
//           <div className="py-12 text-center">
//             <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//             <h3 className="mb-2 text-xl font-semibold text-gray-600">No suppliers found</h3>
//             <p className="text-gray-500">Try adjusting your search or add a new supplier.</p>
//           </div>
//         )}

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-3xl font-bold text-gray-900">
//                     {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
//                   </h2>
//                   <button
//                     onClick={closeModal}
//                     className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     {/* Basic Information */}
//                     <div className="space-y-4">
//                       <h3 className="pb-2 text-lg font-semibold text-gray-800 border-b">Basic Information</h3>
                      
//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Supplier ID *
//                         </label>
//                         <input
//                           type="text"
//                           name="supplierId"
//                           value={formData.supplierId}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter supplier ID"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter supplier name"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Company Name
//                         </label>
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={formData.companyName}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter company name"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Location
//                         </label>
//                         <input
//                           type="text"
//                           name="location"
//                           value={formData.location}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter location"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Status
//                         </label>
//                         <select
//                           name="status"
//                           value={formData.status}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           {statuses.map(status => (
//                             <option key={status} value={status}>{status}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="space-y-4">
//                       <h3 className="pb-2 text-lg font-semibold text-gray-800 border-b">Contact Information</h3>
                      
//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           name="contact.email"
//                           value={formData.contact.email}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter email address"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           name="contact.phone"
//                           value={formData.contact.phone}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter phone number"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Address
//                         </label>
//                         <textarea
//                           name="contact.address"
//                           value={formData.contact.address}
//                           onChange={handleInputChange}
//                           rows={3}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 resize-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter address"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Certifications
//                         </label>
//                         <input
//                           type="text"
//                           value={formData.certifications.join(', ')}
//                           onChange={(e) => handleArrayChange('certifications', e.target.value)}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter certifications (comma-separated)"
//                         />
//                       </div>

//                       <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-700">
//                           Ingredients Supplied
//                         </label>
//                         <textarea
//                           value={formData.ingredientsSupplied.join(', ')}
//                           onChange={(e) => handleArrayChange('ingredientsSupplied', e.target.value)}
//                           rows={3}
//                           className="w-full px-4 py-3 transition-all border border-gray-200 resize-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter ingredients supplied (comma-separated)"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-4 pt-6 border-t">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="px-6 py-3 text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:opacity-50"
//                     >
//                       <Save className="w-5 h-5" />
//                       {loading ? 'Saving...' : (editingSupplier ? 'Update' : 'Create')}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupplierCRUD;