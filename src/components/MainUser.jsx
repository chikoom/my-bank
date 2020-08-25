import React, { Component } from 'react'
import Wave from './Wave'
import userService from '../services/user.service'
import UserSummary from './UserSummary'
import NivoPie from './NivoPie'
import { getThisMonthTimeFrame } from '../services/utils'
import Transction from './Transction'

class MainUser extends Component {
  constructor() {
    super()
    this.state = {
      userSummary: {},
      pieData: null,
      categoryName: '',
      categoryTransactions: [],
    }
  }
  componentDidMount = async () => {
    const newSummary = await this.getUserSummery()
    const categoriesSummary = await this.getUserCategoriesSummary()
    const pieData = this.createPieData(categoriesSummary)
    this.setState(
      {
        userSummary: {
          balance: newSummary.budget,
          income: newSummary.positive,
          expence: newSummary.negative,
        },
        pieData: pieData,
      },
      () => {
        this.props.setLoader(false)
      }
    )
  }
  createPieData = data => {
    return data.map(expense => ({
      id: expense._id,
      label: expense._id,
      value: parseInt(expense.summary) * -1,
      color: `hsl(${Math.floor(Math.random) * 350}, 70%, 50%)`,
    }))
  }
  getUserCategoriesSummary = async () => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      const response = await userService.getUserCategoriesSummary(
        user,
        getThisMonthTimeFrame()
      )
      console.log(response.data)
      return response.data
    }
  }
  getUserExpeseByCategoryName = async categoryName => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      const response = await userService.getUserTransactionsForCategoryName(
        user,
        categoryName
      )
      console.log(response.data)
      this.setState({
        categoryTransactions: response.data.transactions,
      })
      return response.data
    }
  }
  getUserSummery = async () => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      const response = await userService.getUserSummary(
        user,
        getThisMonthTimeFrame()
      )
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
          {this.state.pieData && (
            <div className='chart-container'>
              <NivoPie
                getUserExpeseByCategoryName={this.getUserExpeseByCategoryName}
                data={this.state.pieData}
              />
            </div>
          )}
          {this.state.categoryTransactions.length && (
            <div className='chart-category-results'>
              <table className='transactions-table'>
                {this.state.categoryTransactions.map(trans => (
                  <Transction
                    key={trans._id}
                    details={trans}
                    updateTransactions={null}
                  />
                ))}
              </table>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default MainUser
