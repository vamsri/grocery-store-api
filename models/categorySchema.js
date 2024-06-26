const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  description: String,
  parentCategoryId: {
    type: String,
    default: null  // Allows for nesting categories
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
  }
});

// Optional: Index on name for quicker searches within a tenant
categorySchema.index({ tenantId: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
