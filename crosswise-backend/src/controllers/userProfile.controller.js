const UserProfile = require("../models/userProfile.model");
const config = require("../config")
const uuid = require('uuid');
const crypto = require('crypto');
const { recoverPersonalSignature } = require('eth-sig-util')
const { bufferToHex } = require('ethereumjs-util');
const jwt = require("jsonwebtoken")

const getUserProfile = async (req, res, next) => {
  try {    
    const userAddress = req.params.address
    let userProfile = await UserProfile.find({
      address: {
        "$eq": userAddress
      }
    })
    let user = {}
    if (userProfile.length !== 0) {
      user = userProfile[0]
    }
    return res.json({success: true, profile: user})
  } catch (error) {
    next(error)
  }
}

const saveUserProfile = async (req, res, next) => {
  try {    
    const userAddress = req.params.address
    const {
      name, email, telegram, notification, autoVesting, autoCompound
    } = req.body;
    let userProfile = await UserProfile.find({
      address: {
        "$eq": userAddress
      }
    })

    if( userProfile.length === 0 ) {
      userProfile = new UserProfile;
    } else {
      userProfile = userProfile[0]
    }

    userProfile.address = userAddress;
    userProfile.name = name;
    userProfile.email = email;
    userProfile.telegram = telegram;
    userProfile.notification = notification;
    userProfile.autoVesting = autoVesting;
    userProfile.autoCompound = autoCompound;

    userProfile.save((err, user) => {
      if (err) return next(err)
      res.status(200).send({ success: true, profile: user })
    })
  } catch (error) {
    next(error);
  }
}

const getNonce = async (req, res, next) => {
  try {    
    const userAddress = req.params.address
    let userProfile = await UserProfile.find({
      address: {
        "$eq": userAddress
      }
    })
    let user = {}
    if (userProfile.length === 0) {
      user = new UserProfile;
    } else {
      user = userProfile[0]
    }
    
    if( !user.nonce ) {
        user.nonce = crypto.createHmac('sha256', config.nonceSecret)
                      .update(userAddress + uuid.v4())
                      .digest('hex');
        user.save((err, _user) => {
          if (err) return next(err)
          res.json({success: true, nonce: _user.nonce})
        })
    } else {
      return res.json({success: true, nonce: user.nonce})
    }
  } catch (error) {
    next(error)
  }
}

const verifyNonce = async (req, res, next) => {
  try {    
    const address = req.params.address;
    const { signature } = req.body;
    let userProfile = await UserProfile.find({
      address: {
        "$eq": address
      }
    })

    if (userProfile.length === 0) {
      return res.json({success: false})
    }
    
    const user = userProfile[0];
    
    const msg = user.nonce;
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const sigAddress = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() !== sigAddress.toLowerCase()) {
      return res.json({success: false})
    }

    user.nonce = crypto.createHmac('sha256', config.nonceSecret)
                    .update(address + uuid.v4())
                    .digest('hex');
    user.save((err, _user) => {
      if (err) return next(err)
      const token = jwt.sign({ address: address }, config.secretKey);
      res.json({success: true, jwt: token})
    })
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getUserProfile,
  saveUserProfile,
  getNonce,
  verifyNonce
};