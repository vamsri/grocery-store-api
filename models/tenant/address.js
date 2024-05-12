const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, required: true },
    suite: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    geo: {
        lat: { type: Number },
        lng: { type: Number }
    }
}); // Setting _id to false if this schema will always be used as a subdocument

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
