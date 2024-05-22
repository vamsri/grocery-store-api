const BaseProduct = require('./BaseProductSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electronicsSchema = new Schema({
    brand: {
      type: String,
      required: true
    },
    model: String,
    warranty: String, // e.g., "1 year"
    powerConsumption: {
      value: Number,
      unit: String // e.g., "Watt"
    },
    dimensions: {
      width: Number, // e.g., in cm
      height: Number, // e.g., in cm
      depth: Number // e.g., in cm
    },
    weight: {
      value: Number,
      unit: String // e.g., "kg"
    },
    connectivity: [String], // e.g., ["WiFi", "Bluetooth"]
    batteryLife: {
      value: Number,
      unit: String // e.g., "hours"
    },
    features: [String] // e.g., ["4K Resolution", "Smart TV"]
  });
  
  const Electronics = BaseProduct.discriminator('Electronics', electronicsSchema);
  
  module.exports = Electronics;
  