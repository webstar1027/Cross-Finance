const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReferralModelSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    referrer: {
        type: String,
        required: true
    },
    referee: [{
        type: String,
        required: true
    }],
    code: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const Referral = mongoose.model("Referral", ReferralModelSchema);
module.exports = Referral;
