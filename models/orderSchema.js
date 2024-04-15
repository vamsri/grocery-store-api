const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    index: true  // Facilitates efficient queries filtered by tenantId
  },
  userId: {
    type: String,
    required: true
  },
  products: [{
    productId: String,
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1']
    },
    // Add additional product fields if necessary, like size, color, etc.
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'
  },

  paymentDetails: {
    method: String,
    transactionId: String,
    status: String
    // Additional fields can be added to handle different payment methods
  },
  shippingDetails: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    // Tracking details or additional shipping information can be added here
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;