const BaseProduct = require('./BaseProductSchema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothingSchema = new Schema({
    gender: {
      type: String,
      required: true
    },
    material: String,
    fit: String,
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    color: String,
    careInstructions: String
  });
  
  const Clothing = BaseProduct.discriminator('Clothing', clothingSchema);
  
  module.exports = Clothing;
  