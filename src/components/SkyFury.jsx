import React from 'react';
import skyFuryVid from '../assets/media/skyfury.mp4'

function SkyFury({ isVideoMuted }) {
  return (
  <video className='static-bg static-bg-skyfury' autoPlay loop controls={false} muted={isVideoMuted}>
    <source src={skyFuryVid} type="video/webm" />
  </video>
  )
}

export default SkyFury;