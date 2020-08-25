import React, { Component } from 'react'
import DrawerButton from './DrawerButton'
class Drawer extends Component {
  render() {
    const drawerMargin = this.props.isOpen ? '0px' : '-250px'
    return (
      <div className='drawer' style={{ marginLeft: drawerMargin }}>
        <DrawerButton
          link='/'
          title='HOME'
          icon='faUniversity'
          toggleDrawer={this.props.toggleDrawer}
        />
        <DrawerButton
          link='/transactions'
          title='TRANSACTIONS'
          icon='faReceipt'
          toggleDrawer={this.props.toggleDrawer}
        />
        <DrawerButton
          link='/operations'
          title='OPERATIONS'
          icon='faWallet'
          toggleDrawer={this.props.toggleDrawer}
        />
        <DrawerButton
          link='/breakdown'
          title='BREAKDOWN'
          icon='faChartArea'
          toggleDrawer={this.props.toggleDrawer}
        />
      </div>
    )
  }
}

export default Drawer
