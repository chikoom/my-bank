const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifySignUp = require('./middlewares/verifySignup')
const authJwt = require('./middlewares/authJwt')
const authRotuer = express.Router()
require('dotenv').config()
const SECRET = process.env.SECRET

authRotuer.get('/sanity', (req, res) => {
  res.send('AUTH-OK')
})

authRotuer.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

authRotuer.post(
  '/signup',
  verifySignUp.checkDuplicateUsernameOrEmail,
  async (req, res) => {
    const { username, email, password } = req.body
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password),
    })
    try {
      const createdUser = await user.save()
      const token = jwt.sign({ id: createdUser._id }, SECRET, {
        expiresIn: 86400, // 24 hours
      })
      res.status(200).send({
        id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        expenses: createdUser.expenses,
        accessToken: token,
      })
    } catch (err) {
      res.status(500).send({ message: err })
      return
    }
  }
)

authRotuer.post('/signin', [], async (req, res) => {
  const { username, password } = req.body
  try {
    const requestedUser = await User.findOne({ username })
      .populate('expenses')
      .exec()

    if (!requestedUser) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    const passwordIsValid = bcrypt.compareSync(password, requestedUser.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    const token = jwt.sign({ id: requestedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    })

    res.status(200).send({
      id: requestedUser._id,
      username: requestedUser.username,
      email: requestedUser.email,
      expenses: requestedUser.expenses,
      accessToken: token,
    })
  } catch (err) {
    console.error('error', err)
    res.status(500).send({ message: err })
    return
  }
})

module.exports = authRotuer
