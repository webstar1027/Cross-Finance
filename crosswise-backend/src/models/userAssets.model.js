const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAssetsModelSchema = new Schema({
  address: {type: String, required: true},
  crss: {type: Number},
  bnb_ada: {type: Number},
  bnb_btcb: {type: Number},
  bnb_busd: {type: Number},
  bnb_cake: {type: Number},
  bnb_dot: {type: Number},
  bnb_eth: {type: Number},
  bnb_link: {type: Number},
  crss_bnb: {type: Number},
  crss_usdc: {type: Number},
  crss_busd: {type: Number},
  usdc_busd: {type: Number},
  crss_deposit: {type: Number},
  bnb_ada_deposit: {type: Number},
  bnb_btcb_deposit: {type: Number},
  bnb_busd_deposit: {type: Number},
  bnb_cake_deposit: {type: Number},
  bnb_dot_deposit: {type: Number},
  bnb_eth_deposit: {type: Number},
  bnb_link_deposit: {type: Number},
  crss_bnb_deposit: {type: Number},
  crss_usdc_deposit: {type: Number},
  crss_busd_deposit: {type: Number},
  usdc_busd_deposit: {type: Number},
  history: [Schema.Types.Mixed]
}, { timestamps: false });

const UserAssets = mongoose.model("UserAssets", UserAssetsModelSchema);
module.exports = UserAssets;
