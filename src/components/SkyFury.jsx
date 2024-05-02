import React from 'react';
import skyFuryVid from '../assets/skyfury.mp4'

function SkyFury() {
  return (
    <video className='static-bg static-bg-skyfury' autoPlay loop controls={false}>
      <source src={skyFuryVid} type="video/webm" />
  </video>
  )
}

export default SkyFury;