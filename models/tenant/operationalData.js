const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operationalDataSchema = new Schema({
    business_hours: {
        weekdays: { type: String, required: true },
        weekends: { type: String, required: true },
        special_hours: { type: String, required: false }
    },
    locations: [{
        location_id: { type: String, required: true },
        address: { type: String, required: true },
        manager: { type: String, required: true }
    }],
    staff_information: [{
        staff_id: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        contact_details: { type: Schema.Types.ObjectId, ref: 'ContactDetails' }
    }]
}); // Setting _id to false if this schema will always be used as a subdocument

const OperationalData = mongoose.model('OperationalData', operationalDataSchema);

module.exports = OperationalData;