const { ethers } = require("ethers")
const Compensation = require("../models/compensation.model")

const setCompensation = async (req, res, next) => {
    const data = req.body.data
    console.log("Data: ", data.length)
    for (let i = 0; i < data.length; i++) {
        try {
            const doc = await Compensation.findOne({ address: data[i].address })
            if (doc) {
                doc.amount = data[i].amount.toString()
                await doc.save()
            } else {
                const comp = new Compensation({
                    address: data[i].address,
                    amount: data[i].amount.toString()
                })

                await comp.save()
            }
        } catch (e) {
            return next(e)
        }
    }
    return res.status(200).send({ success: true })
}

const getCompensation = async (req, res, next) => {
    const address = req.params.address
    Compensation.findOne({ address }, (err, doc) => {
        if (err) return next(err)
        else res.status(200).send({ doc })
    })
}

module.exports = {
    setCompensation,
    getCompensation
}