const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserProfileModelSchema = new Schema({
  address: {type: String, required: true},
  name: {type: String},
  email: {type: String},
  telegram: {type: String},
  notification: {type: {
    email: {type: Boolean},
    telegram: {type: Boolean},
  }},
  autoVesting: {type: Boolean},
  autoCompound: {type: Boolean},
  nonce: {type: String}
}, { timestamps: false });

const UserProfiles = mongoose.model("UserProfiles", UserProfileModelSchema);
module.exports = UserProfiles;
