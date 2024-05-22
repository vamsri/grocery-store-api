const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: 'categoryType', // The key used to differentiate between models
  collection: 'products', // Collection name
};

// Base schema for common product attributes
const baseProductSchema = new Schema({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  variants: [{
    variantName: String,
    price: Number,
    stock: Number,
    sku: String,
    attributes: Schema.Types.Mixed // Flexible attributes for variants
  }],
  status: {
    type: String,
    default: 'active'
  },
  slug: String,
  metadata: {
    seoTitle: String,
    seoDescription: String,
    customFields: Schema.Types.Mixed // Flexible custom fields for each category
  }
}, baseOptions);

// Pre-save middleware to update the updatedAt field
baseProductSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const BaseProduct = mongoose.model('BaseProduct', baseProductSchema);

module.exports = BaseProduct;
