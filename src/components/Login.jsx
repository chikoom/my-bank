import React, { Component } from 'react'
import { BrowserRouter as Route, Redirect } from 'react-router-dom'
import validator from 'validator'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: [],
      isLogin: false,
      loginSuccess: false,
    }
  }
  handleInputChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }
  validateValues = () => {
    const errors = []
    const usernamePattern = /^[a-zA-Z0-9]+$/g
    if (!usernamePattern.test(this.state.username)) {
      errors.push('username can be only letters and numbers')
    }
    if (this.state.username.length < 6) {
      errors.push('username must be above 6 chars')
    }
    if (!this.state.isLogin && !validator.isEmail(this.state.email)) {
      errors.push('email in wrong format')
    }
    if (!this.state.isLogin && this.state.password.length < 6) {
      errors.push('password must be above 6 chars')
    }
    return errors
  }
  handleSubmit = async e => {
    e.preventDefault()
    const errors = this.validateValues()
    let loginResult = null
    if (errors.length) {
      console.log(errors)
    } else {
      if (this.state.isLogin) {
        loginResult = await this.props.loginUser(
          this.state.username,
          this.state.password
        )
      } else {
        loginResult = await this.props.signupUser(
          this.state.username,
          this.state.email,
          this.state.password
        )
      }
    }
    if (loginResult) {
      this.setState({
        loginSuccess: true,
      })
    }
  }
  toggleLoginSignup = e => {
    e.preventDefault()
    this.setState({
      isLogin: !this.state.isLogin,
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loginSuccess && <Redirect to='/transactions' />}
        <div className='login-wapper'>
          <form className='login-form'>
            <input
              className='general-input'
              name='username'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            {!this.state.isLogin && (
              <input
                className='general-input'
                name='email'
                type='text'
                placeholder='Email'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            )}
            <input
              className='general-input'
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button
              className='signup-login-link'
              onClick={this.toggleLoginSignup}
            >
              {(this.state.isLogin && 'Signup') || 'Login'}
            </button>
            <button onClick={this.handleSubmit} className='app-button'>
              {(this.state.isLogin && 'Login') || 'Signup'}
            </button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
