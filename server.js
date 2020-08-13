const express = require('express')
const mongoose = require('mongoose')
const apiRouter = require('./server/routes/api')
const authRouter = require('./server/routes/auth')
const path = require('path')
const cors = require('cors')
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

var corsOptions = {
  origin: 'http://localhost:3002',
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )

  next()
})

app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`SERVER UP! :: ${PORT}`)
})
