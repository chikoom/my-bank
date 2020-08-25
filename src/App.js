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
import MainUser from './components/MainUser'
import { Loader } from './components/Loader'

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      currentUser: authService.getCurrentUser(),
      returnToHome: false,
      loading: true,
    }
  }
  setLoader = loaderState => {
    this.setState({
      loading: loaderState,
    })
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
  render() {
    return (
      <Router>
        {this.state.returnToHome && <Redirect to='/' />}
        <div className='app'>
          <Navbar
            logoutUser={this.logoutUser}
            currentUser={this.state.currentUser}
          />
          <div className='app-wrapper'>
            {this.state.loading && <Loader />}
            {(this.state.currentUser && (
              <Route
                exact
                path='/'
                render={() => <MainUser setLoader={this.setLoader} />}
              />
            )) || (
              <Route
                exact
                path='/'
                render={() => <Landing setLoader={this.setLoader} />}
              />
            )}

            <Route
              exact
              path='/breakdown'
              render={() => <Breakdown setLoader={this.setLoader} />}
            />
            <Route
              exact
              path='/login'
              render={() => (
                <Login
                  signupUser={this.signupUser}
                  loginUser={this.loginUser}
                  setLoader={this.setLoader}
                />
              )}
            />
            <Route
              exact
              path='/transactions'
              render={() => (
                <TransactionsList
                  transactions={this.state.transactions}
                  setLoader={this.setLoader}
                />
              )}
            />
            <Route
              exact
              path='/operations'
              render={() => (
                <Operations
                  postNewTransaction={this.postNewTransaction}
                  setLoader={this.setLoader}
                />
              )}
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
