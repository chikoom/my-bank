import React, { Component } from 'react'
import userService from '../services/user.service'

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
    // console.log(this.props)

    return (
      <div className='user-summary'>
        <div className='user-summary-total'>
          <div className='user-summary-header'>BALANCE:</div>
          <div className='user-summary-amount'>{userSummary.balance}</div>
        </div>
        <div className='user-summary-income'>
          <div className='user-summary-header'>INCOME:</div>
          <div className='user-summary-amount'>{userSummary.income}</div>
        </div>
        <div className='user-summary-expences'>
          <div className='user-summary-header'>EXPENSE:</div>
          <div className='user-summary-amount'>{userSummary.expence}</div>
        </div>
      </div>
    )
  }
}

export default UserSummary
