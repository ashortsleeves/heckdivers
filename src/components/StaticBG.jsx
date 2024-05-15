import React from 'react';
import staticVideo from '../assets/media/Static_with_white_noise.webm';

function StaticBG() {
  return (
    <video className='static-bg' autoPlay loop muted controls={false}>
      <source src={staticVideo} type="video/webm" />
    </video>
  );
}

export default StaticBG;