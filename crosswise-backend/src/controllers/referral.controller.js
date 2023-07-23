const { ethers } = require("ethers")
const Referral = require("../models/referral.model")
const config = require("../config")
const { makeid } = require("../utils")
const { masterchef } = require("../config/address")
const abi = require("../config/masterchefAbi")
require('dotenv').config(); // .env

let calling = false

const getReferralCode = async (req, res, next) => {
  const address = req.params.address
  if (!ethers.utils.isAddress(address)) return res.status(400).send({ msg: "Invalid Address" })
  Referral.findOne({ address }, async (err, doc) => {
    if (err) return next(err)
    if (doc) {
      return res.status(200).send({ code: doc.code, count: doc.referee.length, referrer: doc.referrer })
    } else {
      let code
      try {
        code = await genCode()
      } catch (e) {
        return next(e)
      }

      const zero_address = "0x0000000000000000000000000000000000000000"
      const referral = new Referral({
        address,
        code,
        referrer: zero_address,
        referee: []
      })
      referral.save((err, doc) => {
        if (err) return next(err)
        res.status(200).send({ code: doc.code, count: doc.referee.length })
      })
    }
  })
}

const genCode = async () => {
  let created = false
  let code = ""

  while (!created) {
    code = makeid(config.ref_link_length)
    console.log("Code: ", code)
    try {
      const doc = await Referral.findOne({ code })
      console.log("doc: ", doc)
      if (!doc) created = true
    } catch (e) {
      throw (e)
    }

  }

  return code
}

const setReferrer = async (req, res, next) => {
  const code = req.params.code
  const user = req.params.address

  if (calling) return res.status(400).send({ msg: "Please try a few min later" })
  calling = true;
  const timeout = setTimeout(() => {
    calling = false
    clearTimeout(timeout)
  }, 6000)

  if (!ethers.utils.isAddress(user)) return res.status(400).send({ msg: "Invalid Address" })

  // Check if the user is registered
  Referral.findOne({ address: user }, async (err, doc) => {
    if (err) return next(err)
    if (!doc) return res.status(404).send({ msg: "You are not registered yet, please go to Referral Page first." })

    Referral.findOne({ code }, async (err, doc) => {
      if (err) return next(err)
      if (doc) {
        // Prevent Double Set
        const index = doc.referee.indexOf(user)
        if (index >= 0) return res.status(400).send({ msg: "Already set Referral to this account." })

        // Prevent Set Own Address
        if (doc.address === user) return res.status(400).send({ msg: "Can not set yourself as referrer." })

        else {
          try {
            // Get Contract handle
            const address = masterchef
            const rpcProvider = process.env.PRODUCTION === "production" ? config.rpcMainnet : config.rpcTestnet
            const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
            const owner = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
            const contract = new ethers.Contract(address, abi, owner)

            console.log(user, doc.address)
            // Call Contract Change Referrer function
            await contract.changeReferrer(user, doc.address)

            // Save referee
            doc.referee.push(user)
            doc.save((err, doc) => {
              if (err) return next(err)
              // Set Referrer address on my record
              Referral.findOne({ address: user }, async (err, referee) => {
                if (err) return next(err)
                // If I already set Referrer before, remove mine from his referree array and save it
                const zero_address = "0x0000000000000000000000000000000000000000"
                if (referee.referrer !== zero_address) {
                  Referral.findOne({ address: referee.referrer }, async (err, referrer) => {
                    if (err) return next(err)
                    const index = referrer.referee.indexOf(user)
                    if (index < 0) return res.status(404).send({ msg: "Referrer address was not synced." })
                    // Find Previous Referrer and remove it
                    referrer.referee.splice(index, 1)
                    referrer.save((err,) => {
                      if (err) return next(err)
                      referee.referrer = doc.address
                      referee.save((err,) => {
                        if (err) return next(err)
                        res.status(200).send({ success: true })
                      })
                    })
                  })
                } else {
                  // If this is the first time for me to refer, then just set referrer to the owner of code and save it
                  referee.referrer = doc.address
                  referee.save((err,) => {
                    if (err) return next(err)
                    res.status(200).send({ success: true })
                  })
                }
              })
            })
          } catch (err) {
            return next(err)
          }
        }
      } else {
        return res.status(404).send({ msg: "Referrer code is not found" })
      }
    })
  })
}

const deleteReferral = async function (req, res, next) {
  const address = req.params.address
  Referral.findOneAndRemove({ address }, (err, doc) => {
    if (err) return next(err)
    if (!doc) return res.status(404).send({ msg: "Referral not found" })
    return res.status(200).send({ success: true })
  })
}

module.exports = {
  getReferralCode,
  setReferrer,
  deleteReferral
};