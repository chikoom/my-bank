const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/api')

require('dotenv').config()

mongoose.connect('mongodb://localhost/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

const PORT = process.env.PORT
app.listen(PORT, function () {
  console.log(`SERVER UP! :: ${PORT}`)
})
