import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faUniversity,
  faWallet,
  faChartArea,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons'
const iconsMap = {
  faUniversity: faUniversity,
  faWallet: faWallet,
  faChartArea: faChartArea,
  faReceipt: faReceipt,
}
class DrawerButton extends Component {
  render() {
    return (
      <Link to={this.props.link}>
        <button className='nav-menu-button drawer-button'>
          <FontAwesomeIcon
            className='drawer-button-icon'
            icon={iconsMap[this.props.icon]}
          />
          <span className='button-drawer-text'> {this.props.title} </span>
        </button>
      </Link>
    )
  }
}

export default DrawerButton
