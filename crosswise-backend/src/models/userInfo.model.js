const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserInfoModelSchema = new Schema({
  id: {type: String, required: true},
  address: {type: String, required: true},
  assets: {type: Object, required: true},
  transactions: [
    {
        from: {type: String, required: true},
        to: {type: String, required: true},
        token: {type: String, required: true},
        txHash: {type: String, required: true}
    }
  ]
}, { timestamps: false });

const current = mongoose.model("Current", UserInfoModelSchema);
const beforeAttack = mongoose.model("BeforeAttack", UserInfoModelSchema);
const afterAttack = mongoose.model("AfterAttack", UserInfoModelSchema);
const currentMasterchef = mongoose.model("CurrentMasterchef", UserInfoModelSchema);
const beforeAttackMasterchef = mongoose.model("BeforeAttackMasterchef", UserInfoModelSchema);
const afterAttackMasterchef = mongoose.model("AfterAttackMasterchef", UserInfoModelSchema);
module.exports = {current, beforeAttack, afterAttack, currentMasterchef, beforeAttackMasterchef, afterAttackMasterchef};
