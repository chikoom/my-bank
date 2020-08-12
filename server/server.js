const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/api')
require('dotenv').config()

const { PORT, DB_USER, DB_PASS, DB_NAME } = process.env

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@bank.gilr7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(PORT, function () {
  console.log(`SERVER UP! :: ${PORT}`)
})
