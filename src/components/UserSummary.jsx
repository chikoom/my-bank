import React, { Component } from 'react'
import { createCurrencySign } from '../services/utils'

class UserSummary extends Component {
  constructor(props) {
    super()
    this.state = {
      balance: 0,
      income: 0,
      expence: 0,
    }
  }

  render() {
    const { userSummary } = this.props
    return (
      <div className='user-summary'>
        <div className='user-summary-total'>
          <div className='user-summary-header'>ACOUNT TOTAL:</div>
          <div className='user-summary-amount'>
            {createCurrencySign(userSummary.balance)}
          </div>
        </div>
        <h2 className='user-summary-title'>This month balance:</h2>
        <div className='user-summary-income'>
          <div className='user-summary-header'>INCOME:</div>
          <div className='user-summary-amount'>
            {createCurrencySign(userSummary.income)}
          </div>
        </div>
        <div className='user-summary-expences'>
          <div className='user-summary-header'>EXPENSE:</div>
          <div className='user-summary-amount'>
            {createCurrencySign(userSummary.expence)}
          </div>
        </div>
      </div>
    )
  }
}

export default UserSummary
