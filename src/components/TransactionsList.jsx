import React, { Component } from 'react'
import Transction from './Transction'
import { DatePicker } from './DatePicker'
class TransactionsList extends Component {
  render() {
    const { transactions } = this.props

    return (
      <React.Fragment>
        <div>
          <DatePicker />
        </div>
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
            {transactions.map(trans => (
              <Transction
                deleteTransaction={this.props.deleteTransaction}
                key={trans.id}
                details={trans}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default TransactionsList
