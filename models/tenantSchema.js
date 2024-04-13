const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true,
    unique: true
  },
  clientID: {
    type: String,
    required: true,
    unique: true
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
