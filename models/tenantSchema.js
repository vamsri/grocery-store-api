const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  logo_url: {
    type: String,
  },
  cover_image_url: {
    type: String
  },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  contact_details: { type: Schema.Types.ObjectId, ref: 'ContactDetails' },
  branding_details: { type: Schema.Types.ObjectId, ref: 'BrandingDetails' },
  operational_data: { type: Schema.Types.ObjectId, ref: 'OperationalDetails' },
  financial_info: { type: Schema.Types.ObjectId, ref: 'FinancialInfo' },
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
