const express = require('express')
const authJwt = require('./middlewares/authJwt')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const userQueries = require('./queries/UserQueries')

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
  '/user/transactions/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const { from, until } = req.query
    //const results = await User.findById(id).populate('expenses')
    const results = await userQueries.userTransactions(id, from, until)
    res.send(results.expenses)
  }
)

apiRouter.get('/user/summary/:id', authJwt.verifyToken, async (req, res) => {
  const { id } = req.params
  const { from, until } = req.query
  const results = await userQueries.userSummaryById(id, from, until)
  res.send(results[0])
})

apiRouter.get(
  '/user/categories/summary/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const { from, until } = req.query
    const results = await userQueries.userSummaryByCategory(id, from, until)
    res.send(results)
  }
)

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
  '/user/transactions/days/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    const results = await userQueries.userSummaryByDay(id)
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
