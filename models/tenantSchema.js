const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    unique: true,
    default: 'tenant-001'
  },
  name: {
    type: String,
    required: true,
    default: 'Acme Corp'
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    default: "www.example.com"
  },
  clientID: {
    type: String,
    required: true,
    unique: true,
    default: 'Client-001'
  },
  metadata: {
    // Optional field to store additional information about the tenant
    address: String,
    contactEmail: String,
    phone: String,
    // Add other relevant fields as needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
