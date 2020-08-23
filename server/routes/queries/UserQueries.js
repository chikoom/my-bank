const express = require('express')
const authJwt = require('../middlewares/authJwt')
const Transaction = require('../../models/Transaction')
const User = require('../../models/User')
const mongoose = require('mongoose')

const transactionLookup = {
  from: 'transactions',
  localField: 'expenses',
  foreignField: '_id',
  as: 'lookup-data',
}

const userSummaryById = async id => {
  return await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $lookup: transactionLookup },
    { $unwind: { path: '$lookup-data' } },
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

module.exports = {
  userSummaryById,
  userCategoriesById,
  userTransactionsByCategory,
  userTransactionsByCategoryName,
}
