import React, { Component } from 'react'
import userService from '../services/user.service'

class MainUser extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      income: 0,
      expence: 0,
    }
  }
  componentDidMount = async () => {
    this.getUserSummery()
  }
  getUserSummery = async () => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      //console.log('user found', user.accessToken)
      const response = await userService.getUserSummary(user)
      console.log(response.data)
    }
  }
  render() {
    return (
      <div className='user-summary'>
        <div className='user-summary-total'>
          <div>BALANCE:</div>
          <div>{}</div>
        </div>
        <div className='user-summary-income'>
          <div>INCOME:</div>
        </div>
        <div className='user-summary-expences'>
          <div>EXPENSE:</div>
        </div>
      </div>
    )
  }
}

export default MainUser
