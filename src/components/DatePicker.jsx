import React, { Component } from 'react'
import { formatDate } from '../services/utils'

export class DatePicker extends Component {
  constructor(props) {
    super()

    this.state = {
      from: formatDate(new Date(props.timeFrame[0])),
      until: formatDate(new Date(props.timeFrame[1])),
    }
  }
  componentDidMount = async () => {
    this.props.updateTransactions([this.state.from, this.state.until])
  }
  handleDatePick = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        this.props.updateTransactions([this.state.from, this.state.until])
      }
    )
  }
  render() {
    return (
      <div className='datepicker-wrapper'>
        <div className='datepicker'>
          <label htmlFor='start'>From:</label>
          <input
            type='date'
            id='date-start'
            name='from'
            onChange={this.handleDatePick}
            value={this.state.from}
          />
        </div>
        <div className='datepicker'>
          <label htmlFor='end'>To:</label>
          <input
            type='date'
            id='date-end'
            name='until'
            onChange={this.handleDatePick}
            value={this.state.until}
          />
        </div>
      </div>
    )
  }
}
