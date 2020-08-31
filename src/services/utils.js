import React from 'react'
export const formatDate = (unformatedDate, includeYear = true) => {
  const dateObject = new Date(unformatedDate)
  const year = includeYear ? `${dateObject.getFullYear()}-` : ''
  const month = `${('0' + (dateObject.getMonth() + 1)).slice(-2)}-`
  const day = `${('0' + dateObject.getDate()).slice(-2)}`
  return year + month + day
}

export const getThisMonthTimeFrame = () => {
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return [firstDay, lastDay]
}

export const createCurrencySign = amount => {
  return amount >= 0 ? (
    <span className='positive'>
      <span className='small'>₪</span>
      {amount}
    </span>
  ) : (
    <span className='negative'>
      <span className='small'>₪</span>
      {amount * -1}
      <span className='small'>(-)</span>
    </span>
  )
}
