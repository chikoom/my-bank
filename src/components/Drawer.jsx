import React, { Component } from 'react'
import DrawerButton from './DrawerButton'
class Drawer extends Component {
  render() {
    const drawerMargin = this.props.isOpen ? '0px' : '-250px'
    return (
      <div className='drawer' style={{ marginLeft: drawerMargin }}>
        <DrawerButton link='/' title='HOME' icon='faUniversity' />
        <DrawerButton
          link='/transactions'
          title='TRANSACTIONS'
          icon='faReceipt'
        />
        <DrawerButton link='/operations' title='OPERATIONS' icon='faWallet' />
        <DrawerButton link='/breakdown' title='BREAKDOWN' icon='faChartArea' />
      </div>
    )
  }
}

export default Drawer
