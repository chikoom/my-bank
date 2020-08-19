import React, { Component } from 'react'
import axios from 'axios'
import userService from '../services/user.service'
const API_URL = 'http://localhost:3000/api'

class MainUser extends Component {
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
    return <div className='user-summary'>MainUser</div>
  }
}

export default MainUser
