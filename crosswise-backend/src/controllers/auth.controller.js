const Users = require("../models/user.model");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');

const registerUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    console.log(req.body)
    Users.findOne({ userId }, (err, doc) => {
      if (err) return next(err);
      if (!!doc) {
        return res.status(400).send({ msg: "User already exists." })
      } else {
        const newUser = new Users({
          userId,
          password,
          isAdmin: userId === "admin" ? true : false
        })
        newUser.save((err, doc) => {
          if (err) return next(err);
          return res.status(200).send({ msg: "Successfully Registered" })
        })
      }
    })
  } catch (error) {
    return next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    Users.findOne({ userId }, async (err, doc) => {
      if (err) return next(err);
      if (!!doc) {
        const isTrue = await doc.isPasswordMatch(password);
        if (!isTrue) return res.status(400).send({ msg: "Incorrect Password" });
        if (!doc.isAdmin) return res.status(400).send({ msg: "You don't have any access" });
        const payload = {
          user: {
            id: doc.id
          }
        };
        jwt.sign(
          payload,
          config.secretKey,
          { expiresIn: '24h' },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      } else {
        return res.status(400).send({ msg: "User not found." })
      }
    })
  } catch (error) {
    next(error)
  }
}
const registerAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    Users.findOne({ userId }, async (err, doc) => {
      if (err) return next(err);
      if (!!doc) {
        doc.isAdmin = true;
        doc.save((err, doc) => {
          if (err) return next(err)
          res.status(200).send({ msg: "Successfully Registered" })
        })
      } else {
        return res.status(400).send({ msg: "User not found." })
      }
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  loginUser,
  registerUser,
  registerAdmin
};