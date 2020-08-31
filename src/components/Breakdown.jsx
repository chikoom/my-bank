import React, { Component } from 'react'
import ResponsiveCalendar from './NivoCalendar'
import userService from '../services/user.service'
import { formatDate } from '../services/utils'

export default class Breakdown extends Component {
  constructor() {
    super()
    this.state = {
      dailyExpenses: [],
    }
  }
  createDataForCalender = unformatedData => {
    return unformatedData.map(expense => ({
      day: formatDate(new Date(expense._id)),
      value: expense.summary * -1,
    }))
  }
  componentDidMount = async () => {
    const unforamtedData = await userService.getUserTransactionsDays()
    const dailyExpenses = this.createDataForCalender(unforamtedData)
    this.setState({
      dailyExpenses,
    })
  }
  render() {
    return (
      <div className='breakdown-wrraper'>
        <div className='breakdown-calendar-wrapper'>
          <h2 className='breakdown-header'>Your Yearly Breakdown</h2>
          <div className='breakdown-calendar'>
            <ResponsiveCalendar data={this.state.dailyExpenses} />
          </div>
        </div>
      </div>
    )
  }
}
