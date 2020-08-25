import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import userService from '../services/user.service'

class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amountVal: 0,
      vendorVal: '',
      categoryVal: '',
      dateVal: '',
      redirect: false,
    }
  }
  handleInputChange = e => {
    this.setState({
      [`${e.target.name}Val`]: e.target.value,
    })
  }
  handleSubmitTransaction = async e => {
    e.preventDefault()
    let amountValue =
      e.target.name === 'expense'
        ? -1 * this.state.amountVal
        : parseInt(this.state.amountVal)
    const submission = {
      amount: amountValue,
      vendor: this.state.vendorVal,
      category: this.state.categoryVal,
      date: this.state.dateVal,
    }
    let res = await userService.postNewTransaction(submission)
    this.setState({
      redirect: true,
    })
    console.log(res)
  }
  render() {
    return (
      <React.Fragment>
        {this.state.redirect && <Redirect to='/transactions' />}
        <form className='operations-form'>
          <div className='input-wrapper'>
            <label htmlFor='number'>Price</label>
            <input
              className='operations-form-input'
              type='number'
              name='amount'
              id='operations-form-amount'
              placeholder='00'
              value={this.state.amountVal}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='vendor'>Vendor</label>
            <input
              className='operations-form-input'
              type='text'
              name='vendor'
              id='operations-form-vendor'
              placeholder='Vendor'
              value={this.state.vendorVal}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='category'>Category</label>
            <input
              list='categories'
              className='operations-form-input'
              type='text'
              name='category'
              id='operations-form-category'
              placeholder='Category'
              value={this.state.categoryVal}
              onChange={this.handleInputChange}
            />
            <datalist id='categories'>
              <option value='Default' />
              <option value='Fun' />
              <option value='Appartment' />
              <option value='Business' />
              <option value='Salary' />
            </datalist>
          </div>
          <div className='input-wrapper'>
            <label htmlFor='date'>Date</label>
            <input
              className='operations-form-input'
              type='date'
              name='date'
              id='operations-form-date'
              placeholder='Date'
              value={this.state.dateVal}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='operations-form-buttons'>
            <button
              name='income'
              className='operations-form-button'
              onClick={this.handleSubmitTransaction}
            >
              Income <FontAwesomeIcon icon={faSignInAlt} />
            </button>
            <button
              name='expense'
              className='operations-form-button'
              onClick={this.handleSubmitTransaction}
            >
              Expense <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default Operations
