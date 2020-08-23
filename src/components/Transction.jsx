import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../services/utils'
class Transaction extends Component {
  deleteTransaction = async () => {
    this.props.deleteTransaction(this.props.details._id)
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
