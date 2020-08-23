import React, { Component } from 'react'
class Wave extends Component {
  render() {
    return (
      <div className='wave-bg '>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#0099ff'
            fill-opacity='1'
            d='M0,64L26.7,85.3C53.3,107,107,149,160,181.3C213.3,213,267,235,320,229.3C373.3,224,427,192,480,197.3C533.3,203,587,245,640,229.3C693.3,213,747,139,800,106.7C853.3,75,907,85,960,80C1013.3,75,1067,53,1120,69.3C1173.3,85,1227,139,1280,149.3C1333.3,160,1387,128,1413,112L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z'
          ></path>
        </svg>
      </div>
    )
  }
}

export default Wave
