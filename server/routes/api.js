const express = require('express')
const authJwt = require('./middlewares/authJwt')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
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

apiRouter.get('/user/summary/:id', authJwt.verifyToken, async (req, res) => {
  const { id } = req.params
  console.log(id)

  const results = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'transactions',
        localField: 'expenses',
        foreignField: '_id',
        as: 'lookup-data',
      },
    },
    {
      $unwind: {
        path: '$lookup-data',
      },
    },
    {
      $group: {
        _id: id,
        budget: { $first: '$budget' },
        username: { $first: '$username' },
        positive: {
          $sum: {
            $cond: [
              { $gt: ['$lookup-data.amount', 0] },
              '$lookup-data.amount',
              0,
            ],
          },
        },
        negative: {
          $sum: {
            $cond: [
              { $lt: ['$lookup-data.amount', 0] },
              '$lookup-data.amount',
              0,
            ],
          },
        },
      },
    },
  ])
  res.send(results[0])
})

apiRouter.get('/sanity', (req, res) => {
  res.send('OK')
})

apiRouter.get('/user/categories/:id', authJwt.verifyToken, async (req, res) => {
  const { id } = req.params
  console.log(id)

  const results = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'transactions',
        localField: 'expenses',
        foreignField: '_id',
        as: 'lookup-data',
      },
    },
    {
      $unwind: {
        path: '$lookup-data',
      },
    },
    {
      $group: {
        _id: id,
        categories: { $addToSet: '$lookup-data.category' },
        username: { $first: '$username' },
      },
    },
  ])
  console.log(results)
  res.send(results[0].categories)
})

apiRouter.get(
  '/user/transactions/categories/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id } = req.params
    console.log(id)

    const results = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'transactions',
          localField: 'expenses',
          foreignField: '_id',
          as: 'lookup-data',
        },
      },
      {
        $unwind: {
          path: '$lookup-data',
        },
      },
      {
        $group: {
          _id: '$lookup-data.category',
          transactions: { $push: '$lookup-data' },
        },
      },
    ])
    console.log(results)
    res.send(results)
  }
)

apiRouter.get(
  '/user/transactions/categories/:categoryName/:id',
  authJwt.verifyToken,
  async (req, res) => {
    const { id, categoryName } = req.params
    console.log(id, categoryName)

    const results = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'transactions',
          localField: 'expenses',
          foreignField: '_id',
          as: 'lookup-data',
        },
      },
      {
        $unwind: {
          path: '$lookup-data',
        },
      },
      { $match: { 'lookup-data.category': categoryName } },
      {
        $group: {
          _id: '$lookup-data.category',
          summary: {
            $sum: '$lookup-data.amount',
          },
          transactions: {
            $push: '$lookup-data',
          },
        },
      },
    ])
    console.log(results)
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
