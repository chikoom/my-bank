import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Drawer from './Drawer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      drawerOpen: false,
      userMenuOpen: false,
    }
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    })
  }
  render() {
    const buttonStyle = this.state.drawerOpen ? 'nav-button-open' : ''
    return (
      <React.Fragment>
        <nav>
          <button
            onClick={this.toggleDrawer}
            className={`nav-button  ${buttonStyle}`}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className='nav-logo'>
            <div className='logo'>SPEND!</div>
          </div>
          {(this.props.currentUser && (
            <div className='nav-user-container'>
              <div className='nav-username'>
                {this.props.currentUser.username}
              </div>
              <div className='nav-usermenu'>
                <button onClick={this.props.logoutUser}>Logout</button>
              </div>
            </div>
          )) || (
            <div className='nav-usermenu'>
              <Link to='/login'>
                <button>Login</button>
              </Link>
            </div>
          )}
        </nav>
        <Drawer
          toggleDrawer={this.toggleDrawer}
          isOpen={this.state.drawerOpen}
        />
      </React.Fragment>
    )
  }
}

export default Navbar
