const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialInfoSchema = new Schema({
    bank_account_details: {
        bank_name: { type: String, required: true },
        account_number: { type: String, required: true },
        branch_code: { type: String, required: false },
        swift_code: { type: String, required: false }
    },
    tax_info: {
        GST_number: { type: String, required: true },
        PAN: { type: String, required: true }
    },
    credit_limit: {
        type: Number,
        default: 0
    },
    pricing_models: [{
        model_name: { type: String, required: true },
        description: { type: String, required: false }
    }]
}); // Setting _id to false if this schema will always be used as a subdocument

const FinancialInfo = mongoose.model('FinancialInfo', financialInfoSchema);

module.exports = FinancialInfo;