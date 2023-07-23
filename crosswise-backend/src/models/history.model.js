const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistoryModelSchema = new Schema({
  txhash: {type: String, required: true},
  asset: {type: String, required: true},
  from: {type: Number},
  to: {type: Number},
}, { timestamps: false });

const History = mongoose.model("History", HistoryModelSchema);
module.exports = History;
