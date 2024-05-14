import React, {useState} from 'react';
import reloadImg from '../assets/media/reload.svg';
import saturnImg from '../assets/media/planet-space-icon.svg';
import retroImg from '../assets/media/retro.svg';
import liberTea from '../assets/media/tea-cup-tea.svg';

export default function ButtonControls() {
    const [isRotating, setIsRotating] = useState(false);
    const [retroStyle, setRetroStyle] = useState(false);

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const toggleRetroStyle = () => {
        setRetroStyle(!retroStyle);
    }

    if (isRotating) {
        document.body.classList.add('rotate-active');
    } else {
        document.body.classList.remove('rotate-active');
    }

    if (retroStyle) {
        document.body.classList.add('retro-active');
    } else {
        document.body.classList.remove('retro-active');
    }
    function handleZoomClick(targetButtonID) {
        const secondButton = document.getElementById(targetButtonID);
    
        if (secondButton) {
          // Programmatically trigger a click event on the second button
          secondButton.click();
          console.log(targetButtonID);
        }
      }

    return (
        <div className='button-controls'>
            <button onClick={() => handleZoomClick('zIn')}>+ <span>Zoom In</span></button>
            <button onClick={() => handleZoomClick('zOut')}>- <span>Zoom Out</span></button>
            <button onClick={toggleRotation}><img src={saturnImg} alt="Saturn Icon"/> <span>Toggle Rotation</span></button>
            <button onClick={() => location.reload()}><img src={reloadImg} alt="reload network"/> <span>Reload Network</span></button>
            <button onClick={toggleRetroStyle}><img src={retroImg} alt="Enable/Disable retro terminal look"/> <span>Toggle retro look</span></button>

            <div className="links">
                <span class="text">Get the dev a nice cup of LIBER-TEA<strong>:</strong></span>
                <a href="https://heckdivers.net" target="_blank"><img src={liberTea} alt="Tea Icon"/> HECKDIVERS.NET</a>   
            </div>

            {/* <div className="links links-web"> 
                <a className='liberTea' href="https://www.paypal.com/donate/?hosted_button_id=AVT886QL88AD6" target="_blank"><img src={liberTea} alt="Tea Icon"/>Score me some <strong>LIBER-TEA</strong></a>
                <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3235505289" target="_blank">wallpaper engine</a>
                <a href="https://github.com/ashortsleeves" target="_blank">github</a>
            </div> */}

        </div>
    )
}