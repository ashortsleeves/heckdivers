import React from 'react';
import staticVideo from '../assets/Static_with_white_noise.webm';

function VideoComponent() {
  return (
      <video id="static" className='static-bg' autoPlay loop muted controls={false}>
        <source src={staticVideo} type="video/webm" />
      </video>
  );
}

export default VideoComponent;