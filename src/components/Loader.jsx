import React from 'react'

export const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader-inner'>
        <img alt='' className='loader-image' src='./assets/coin_loader.svg' />
        <h4 className='loading-text'>Loading...</h4>
      </div>
    </div>
  )
}
