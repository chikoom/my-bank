const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: String, lowercase: true, default: 'default' },
  vendor: { type: String, lowercase: true, default: 'default' },
  date: { type: Date, default: new Date() },
})
const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
