const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  categories: [String],  // Array of strings to allow multiple categories per product
  inventoryCount: {
    type: Number,
    required: true,
    min: [0, 'Inventory count cannot be negative']
  },
  images: [String],  // URLs to product images
  tenantId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
