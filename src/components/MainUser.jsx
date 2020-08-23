import React, { Component } from 'react'
import Wave from './Wave'
import userService from '../services/user.service'
import UserSummary from './UserSummary'
import NivoPie from './NivoPie'

const data = [
  {
    id: 'rust',
    label: 'rust',
    value: 359,
    color: 'hsl(6, 70%, 50%)',
  },
  {
    id: 'ruby',
    label: 'ruby',
    value: 72,
    color: 'hsl(283, 70%, 50%)',
  },
  {
    id: 'hack',
    label: 'hack',
    value: 54,
    color: 'hsl(242, 70%, 50%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 435,
    color: 'hsl(154, 70%, 50%)',
  },
  {
    id: 'c',
    label: 'c',
    value: 341,
    color: 'hsl(341, 70%, 50%)',
  },
]

class MainUser extends Component {
  constructor() {
    super()
    this.state = {
      userSummary: {},
    }
  }
  componentDidMount = async () => {
    const newSummary = await this.getUserSummery()
    this.setState({
      userSummary: {
        balance: newSummary.budget,
        income: newSummary.positive,
        expence: newSummary.negative,
      },
    })
  }
  getUserSummery = async () => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      //console.log('user found', user.accessToken)
      const response = await userService.getUserSummary(user)
      console.log(response.data)
      return response.data
    }
  }
  render() {
    return (
      <React.Fragment>
        <div id='landing-wrapper' className='light-gradient'>
          <div id='landing-top'>
            <div id='landing-inner'>
              <UserSummary {...this.state} />
            </div>
          </div>
          <Wave />
          <div className='chart-container'>
            <NivoPie data={data} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default MainUser
