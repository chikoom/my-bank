import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Operations from './components/Operations'
import TransactionsList from './components/TransactionsList'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Breakdown from './components/Breakdown'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import authService from './services/auth.service'
const API_URL = 'http://localhost:3001/api'
const AUTH_URL = 'http://localhost:3001/auth'
// const API_URL = '/api'

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      currentUser: authService.getCurrentUser(),
      returnToHome: false,
    }
  }
  loginUser = async (username, password) => {
    const loginResult = await authService.login(username, password)
    this.setState({
      currentUser: loginResult,
    })
    return loginResult
  }
  signupUser = async (username, email, password) => {
    const signupResult = await authService.register(username, password, email)
    this.setState({
      currentUser: signupResult,
    })
    return signupResult
  }
  logoutUser = () => {
    authService.logout()
    this.setState({
      currentUser: null,
      returnToHome: true,
    })
    return true
  }
  componentDidMount = async () => {
    const allTransactions = await this.getAllTransactions()
    this.setState({ transactions: allTransactions })
  }
  getAllTransactions = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`${API_URL}/transactions/`, requestOptions)
    const data = await response.json()
    return data
  }
  postNewTransaction = async transactionObject => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionObject),
    }
    const response = await fetch(`${API_URL}/transaction/`, requestOptions)
    const data = await response.json()
    const currentTransactions = [...this.state.transactions]
    currentTransactions.push(data)
    this.setState({ transactions: currentTransactions })
    return this.state.transactions
  }
  deleteTransaction = async transactionID => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${API_URL}/transaction/${transactionID}`,
      requestOptions
    )
    const data = await response.json()
    const currentTransactions = [...this.state.transactions]
    console.log('App -> currentTransactions', currentTransactions)
    console.log('App -> data', data)
    const filteredTransactions = currentTransactions.filter(
      trans => trans._id !== data._id
    )
    this.setState({ transactions: filteredTransactions })
    return this.state.transactions
  }
  render() {
    return (
      <Router>
        {this.state.returnToHome && <Redirect to='/' />}
        <div className='app'>
          <Navbar
            logoutUser={this.logoutUser}
            currentUser={this.state.currentUser}
          />
          <Route exact path='/' render={() => <Landing />} />
          <Route exact path='/breakdown' render={() => <Breakdown />} />
          <Route
            exact
            path='/login'
            render={() => (
              <Login signupUser={this.signupUser} loginUser={this.loginUser} />
            )}
          />
          <Route
            exact
            path='/transactions'
            render={() => (
              <TransactionsList
                deleteTransaction={this.deleteTransaction}
                transactions={this.state.transactions}
              />
            )}
          />
          <Route
            exact
            path='/operations'
            render={() => (
              <Operations postNewTransaction={this.postNewTransaction} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
