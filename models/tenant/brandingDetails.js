const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandingDetailsSchema = new Schema({
    logo_url: {
        type: String,
        required: [true, 'Logo URL is required'],
    },
    cover_image_url: {
        type: String,
        required: [true, 'Cover image URL is required'],
    },
    brand_color: {
        primary: { type: String, required: [true, 'Primary brand color is required'] },
        secondary: { type: String, required: [false, 'Secondary brand color is optional'] }
    },
    tagline: {
        type: String,
        required: [true, 'Tagline is required'],
    },
    theme_settings: {
        type: String,
        default: 'default',
        enum: ['default', 'dark', 'light', 'custom'],
    },
    brand_guidelines: {
        type: String,
        required: [false, 'Brand guidelines URL is optional'],
    }
}); // Setting _id to false if this schema will always be used as a subdocument

const BrandingDetails = mongoose.model('BrandingDetails', brandingDetailsSchema);

module.exports = BrandingDetails;
