const UserAssets = require("../models/userAssets.model");
const UserInfo = require("../models/userInfo.model");
const json = require('../data');
// const History = require('../models/history.model');

const getUserAssets = async (req, res, next) => {
  try {
    let filter = {}
    
    let userAssets = await UserAssets.find(filter)

    return res.json({success: true, userAssets: userAssets})
  } catch (error) {
    next(error)
  }
}

const getUserAsset = async (req, res, next) => {
  try {
    let filter = {}
    
    // filter for auction status: active, upcome, complete
    if (req.params.address) {
      const userAddress = req.params.address
      filter.address = {"$eq": userAddress}
    }

    let userAssets = await UserAssets.find(filter)
    let user = {}
    if (userAssets.length !== 0) {
      user = userAssets[0]
    }
    return res.json({success: true, userAssets: user})
  } catch (error) {
    next(error)
  }
}

const registerUserInfo = async (req, res, next) => {
  try {
    const {id} = req.body;
    console.log("id: ",id);
    console.log("length: ",json[id].length);
    for await (const index of json[id]) {
      const {address, assets, transactions} = index;
      const data = new UserInfo[id]({
        id,
        address,
        assets,
        transactions
      });
      data.save(((err, doc) => {
        if (err) next(err);
        return console.log(index.address);
      }))
    }
    return res.json("Success");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserAssets,
  getUserAsset,
  registerUserInfo
};