const express = require('express')
const authJwt = require('./middlewares/authJwt')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const userQueries = require('./queries/UserQueries')
const mongoose = require('mongoose')

const apiRouter = express.Router()

apiRouter.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

apiRouter.post(
  '/transaction/user/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const transaction = new Transaction(req.body)
    const savedTransaction = await transaction.save()
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: { expenses: savedTransaction },
      },
      { new: true }
    )
    res.send(updatedUser)
  }
)

apiRouter.get(
  '/transactions/user/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const results = await User.findById(id).populate('expenses')
    res.send(results.expenses)
  }
)

apiRouter.get(
  '/user/transactions/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const results = await User.findById(id).populate('expenses')
    res.send(results.expenses)
  }
)

apiRouter.get('/sanity', (req, res) => {
  res.send('OK')
})

apiRouter.get('/user/summary/:id', authJwt.verifyToken, async (req, res) => {
  const { id } = req.params
  const results = await userQueries.userSummaryById(id)
  res.send(results[0])
})

apiRouter.get('/user/categories/:id', authJwt.verifyToken, async (req, res) => {
  const { id } = req.params
  const results = await userQueries.userCategoriesById(id)
  res.send(results[0].categories)
})

apiRouter.get(
  '/user/transactions/categories/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const results = await userQueries.userTransactionsByCategory(id)
    res.send(results)
  }
)

apiRouter.get(
  '/user/transactions/categories/:categoryName/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id, categoryName } = req.params
    const results = await userQueries.userTransactionsByCategoryName(
      id,
      categoryName
    )
    res.send(results[0])
  }
)

apiRouter.get('/transactions', async (req, res) => {
  const results = await Transaction.find({})
  res.send(results)
})

apiRouter.delete('/transaction/:id', async (req, res) => {
  const { id } = req.params
  const deletedTransaction = await Transaction.findByIdAndDelete(id)
  res.send(deletedTransaction)
})

module.exports = apiRouter
