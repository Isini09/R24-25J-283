const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  location: {
    country: String,
    city: String,
    address: String,
    postalCode: String,
  },
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: String,
    website: String
  },
  certifications: [{
    certName: String,
    issuer: String,
    validFrom: Date,
    validTo: Date,
    certFileUrl: String
  }],
  ingredientsSupplied: [String], // e.g., ['Black Tea', 'Green Tea']
  documents: [{
    name: String,
    fileUrl: String,
    uploadDate: Date
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supplier', supplierSchema);
