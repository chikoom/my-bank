const express = require('express')
const Transaction = require('../models/Transaction')

const router = express.Router()

router.get('/sanity', (req, res) => {
  res.send('OK')
})

router.get('/', (req, res) => {
  res.send()
})

router.post('/', (req, res) => {
  res.send()
})

router.delete('/', (req, res) => {
  res.send()
})

module.exports = router
