import React from 'react';
import TwoHundredRandomCharacters from './TwoHundredRandomCharacters';
import VideoComponent from './VideoComponent';

function IlluminateAreHere() {
  return (
    <div className="illuminate-wrap">
      <VideoComponent/>
      <div className='the-illuminate-are-here'>
        <TwoHundredRandomCharacters />
        <TwoHundredRandomCharacters />
        <TwoHundredRandomCharacters />
      </div>
    </div>

  );
}

export default IlluminateAreHere;