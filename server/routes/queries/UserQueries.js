const User = require('../../models/User')
const mongoose = require('mongoose')
const moment = require('moment')

const transactionLookup = {
  from: 'transactions',
  localField: 'expenses',
  foreignField: '_id',
  as: 'lookup-data',
}

const userCategoriesById = async id => {
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
    {
      $group: {
        _id: id,
        categories: { $addToSet: '$lookup-data.category' },
        username: { $first: '$username' },
      },
    },
  ])
}

const userTransactionsByCategory = async id => {
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
    {
      $group: {
        _id: '$lookup-data.category',
        transactions: { $push: '$lookup-data' },
      },
    },
  ])
}

const userTransactionsByCategoryName = async (id, categoryName) => {
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
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
}

const userTransactions = async (id, from = 0, until = new Date('3000')) => {
  from = new Date(from)
  until = new Date(until)
  return await User.findById(id).populate({
    path: 'expenses',
    match: {
      $and: [{ date: { $lte: until } }, { date: { $gte: from } }],
    },
  })
}

const userSummaryByCategory = async (
  id,
  from = 0,
  until = new Date('3000')
) => {
  from = new Date(from)
  until = new Date(until)
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
    { $match: { 'lookup-data.amount': { $lte: 0 } } },
    {
      $group: {
        _id: '$lookup-data.category',
        summary: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gte: ['$lookup-data.date', from] },
                  { $lte: ['$lookup-data.date', until] },
                ],
              },
              '$lookup-data.amount',
              0,
            ],
          },
        },
      },
    },
  ])
}

const userSummaryById = async (id, from = 0, until = new Date('3000')) => {
  from = new Date(from)
  until = new Date(until)
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
    {
      $group: {
        _id: id,
        username: { $first: '$username' },
        budget: {
          $sum: '$lookup-data.amount',
        },
        positive: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gte: ['$lookup-data.amount', 0] },
                  { $gte: ['$lookup-data.date', from] },
                  { $lte: ['$lookup-data.date', until] },
                ],
              },
              '$lookup-data.amount',
              0,
            ],
          },
        },
        negative: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $lt: ['$lookup-data.amount', 0] },
                  { $gte: ['$lookup-data.date', from] },
                  { $lte: ['$lookup-data.date', until] },
                ],
              },
              '$lookup-data.amount',
              0,
            ],
          },
        },
      },
    },
  ])
}

module.exports = {
  userSummaryById,
  userCategoriesById,
  userTransactionsByCategory,
  userTransactionsByCategoryName,
  userSummaryByCategory,
  userTransactions,
}
