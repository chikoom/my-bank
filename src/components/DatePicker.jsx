import React, { Component } from 'react'

export class DatePicker extends Component {
  constructor() {
    super()
    this.state = {
      start: '',
      end: '',
    }
  }
  handleDatePick = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state)
      }
    )
  }
  render() {
    return (
      <div>
        <div>
          <label for='start'>From:</label>
          <input
            type='date'
            id='date-start'
            name='start'
            onChange={this.handleDatePick}
            value={this.state.start}
          />
        </div>
        <div>
          <label for='end'>To:</label>
          <input
            type='date'
            id='date-end'
            name='end'
            onChange={this.handleDatePick}
            value={this.state.end}
          />
        </div>
      </div>
    )
  }
}
