import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wave from './Wave'

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div id='landing-wrapper' className='light-gradient'>
          <div id='landing-top'>
            <div id='landing-inner'>
              <h2 className='landing-logo'>SPEND!</h2>
              <h3 className='landing-slogen'>
                expence tracker that helps you save
              </h3>
              <Link to='/login'>
                <button className='button-login-landing app-button'>
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
          <Wave />
        </div>
      </React.Fragment>
    )
  }
}

export default Landing
