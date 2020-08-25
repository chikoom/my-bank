import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../services/utils'
import userService from '../services/user.service'
class Transaction extends Component {
  deleteTransaction = async () => {
    await userService.deleteTransaction(this.props.details._id)
    this.props.updateTransactions()
  }
  render() {
    const { date, vendor, category, amount } = this.props.details
    const rowClass = amount >= 0 ? 'positive' : 'negative'

    return (
      <tr className={rowClass}>
        <td>{formatDate(date)}</td>
        <td>{vendor}</td>
        <td>{category}</td>
        <td>{amount}</td>
        <td>
          <button onClick={this.deleteTransaction}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    )
  }
}

export default Transaction
