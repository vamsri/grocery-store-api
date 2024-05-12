const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactDetailsSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
}); // Setting _id to false if this schema will always be used as a subdocument

const ContactDetails = mongoose.model('ContactDetails', contactDetailsSchema);

module.exports = ContactDetails;