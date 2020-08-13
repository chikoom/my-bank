import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
class Transaction extends Component {
  deleteTransaction = async () => {
    this.props.deleteTransaction(this.props.details._id)
  }
  render() {
    const { details } = this.props
    const rowClass = details.amount >= 0 ? 'positive' : 'negative'
    return (
      <tr className={rowClass}>
        <td>{details.date}</td>
        <td>{details.vendor}</td>
        <td>{details.category}</td>
        <td>{details.amount}</td>
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
