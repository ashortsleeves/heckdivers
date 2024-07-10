import React, { useState } from 'react';
import reloadImg from '../assets/media/reload.svg';
import saturnImg from '../assets/media/planet-space-icon.svg';
import retroImg from '../assets/media/retro.svg';
import liberTea from '../assets/media/tea-cup-tea.svg';
import liberTeaTwo from '../assets/media/liber-tea-2.png';
import musicIcon from '../assets/media/music-icon.svg';

export default function ButtonControls({ toggleSkyFury, toggleVideoMute, isVideoMuted }) {
    const [showMuteButton, setShowMuteButton] = useState(false); // State for showing mute button

    // Function to toggle visibility of mute button when toggleSkyFury is triggered
    const handleToggleSkyFury = () => {
        setShowMuteButton(!showMuteButton);
        toggleSkyFury(); // Call toggleSkyFury function
    };

    const [isRotating, setIsRotating] = useState(false);
    const [retroStyle, setRetroStyle] = useState(false);

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const toggleRetroStyle = () => {
        setRetroStyle(!retroStyle);
    };

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
            {showMuteButton && ( // Conditionally render mute button
                <button className="mute-vid" onClick={toggleVideoMute}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50" height="50" viewBox="0 0 75 75" stroke="#fff" strokeWidth="5">
                        <path d="m39,14-17,15H6V48H22l17,15z" fill="#111" strokeLinejoin="round" />
                        <path d="m49,26 20,24m0-24-20,24" fill="none" strokeLinecap="round" />
                    </svg>
                    <span>{isVideoMuted ? 'Unmute Video' : 'Mute Video'}</span>
                    {isVideoMuted ? '' : <i><img src={musicIcon} alt="Music Icon" /> SKYFURY - A Cup of Liber-tea</i>}
                </button>
            )}
            <button onClick={() => handleZoomClick('zIn')}>+ <span>Zoom In</span></button>
            <button onClick={() => handleZoomClick('zOut')}>- <span>Zoom Out</span></button>
            <button onClick={toggleRotation}><img src={saturnImg} alt="Saturn Icon" /> <span>Toggle Rotation</span></button>
            <button onClick={() => location.reload()}><img src={reloadImg} alt="reload network" /> <span>Reload Network</span></button>
            <button onClick={toggleRetroStyle}><img src={retroImg} alt="Enable/Disable retro terminal look" /> <span>Toggle retro look</span></button>

            { window.location.href === 'https://heckdivers.net/' ?
                <div className="links links-web">
                    <a className='liberTea' href="https://www.paypal.com/donate/?hosted_button_id=AVT886QL88AD6" target="_blank"><img src={liberTeaTwo} alt="Tea Icon"/>Get me a nice cup of <strong>LIBER-TEA</strong></a>
                    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3235505289" target="_blank">wallpaper engine</a>
                    <a href="https://github.com/ashortsleeves" target="_blank">github</a>
                </div>
            :
                <div className="links">
                    <span className="text" onClick={handleToggleSkyFury}>Give the creator a nice cup of LIBER-TEA<strong>:</strong></span>
                    <a href="#" onClick={handleToggleSkyFury}><img src={liberTea} alt="Tea Icon" /> HECKDIVERS.NET</a>
                </div>
            }
        </div>
    )
}