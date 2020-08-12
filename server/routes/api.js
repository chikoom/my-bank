const express = require('express')
const Transaction = require('../models/Transaction')

const apiRouter = express.Router()

apiRouter.get('/sanity', (req, res) => {
  res.send('OK')
})

apiRouter.get('/transactions', async (req, res) => {
  const results = await Transaction.find({})
  res.send(results)
})

apiRouter.post('/transaction', async (req, res) => {
  const transaction = new Transaction(req.body)
  const savedTransaction = await transaction.save()
  res.send(savedTransaction)
})

apiRouter.delete('/transaction/:id', async (req, res) => {
  const { id } = req.params
  const deletedTransaction = await Transaction.findByIdAndDelete(id)
  res.send(deletedTransaction)
})

module.exports = apiRouter
