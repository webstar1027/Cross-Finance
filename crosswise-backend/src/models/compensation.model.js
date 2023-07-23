const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompensationModelSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const Referral = mongoose.model("Compensation", CompensationModelSchema);
module.exports = Referral;
