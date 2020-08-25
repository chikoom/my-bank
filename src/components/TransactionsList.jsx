import React, { Component } from 'react'
import Transction from './Transction'
import { DatePicker } from './DatePicker'
import { getThisMonthTimeFrame } from '../services/utils'
import userService from '../services/user.service'

class TransactionsList extends Component {
  constructor(props) {
    super()
    this.state = {
      transactions: [],
    }
    props.setLoader(true)
  }
  componentDidMount = async () => {
    const transactions = await userService.getUserTransactions(
      getThisMonthTimeFrame()
    )
    this.setState(
      {
        transactions,
      },
      () => {
        this.props.setLoader(false)
      }
    )
  }
  updateTransactions = async dateArray => {
    const transactions = await userService.getUserTransactions(dateArray)
    console.log('TR', transactions)
    this.setState({
      transactions,
    })
  }
  render() {
    return (
      <div className='transactions-table-wrapper'>
        <DatePicker
          timeFrame={getThisMonthTimeFrame()}
          updateTransactions={this.updateTransactions}
        />
        <table className='transactions-table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Amount</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(trans => (
              <Transction
                key={trans._id}
                details={trans}
                updateTransactions={this.componentDidMount}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TransactionsList
