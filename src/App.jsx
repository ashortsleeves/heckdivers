import React, { useState, useEffect } from 'react';
import './App.scss';
import Planet from './components/Planet';
import NewsFeed from './components/NewsFeed';
import Dispatches from './components/Dispatches';
import StaticBG from './components/StaticBG';
import DefaultZoomTools from './components/DefaultZoomTools';
import ButtonControls from './components/ButtonControls';
import SkyFury from './components/SkyFury.jsx';
import planetsData from './planets.json';
import grid from './assets/media/grid.webp';
import superEarth from './assets/media/Super_earth.webp';
import './assets/scripts/wallpaperEngine.js';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [showSkyFury, setShowSkyFury] = useState(false); // State for showing SkyFury
  const [isVideoMuted, setIsVideoMuted] = useState(false); // State for video mute status
  const planets = planetsData;

  // Fetch data from APIs and update state
  const fetchData = async () => {
    try {
      const campaignsResponse = await fetch('https://raw.githubusercontent.com/ashortsleeves/heckdivers-json/main/campaigns.json');
      const campaignsData = await campaignsResponse.json();
      setCampaigns(campaignsData);
      console.log("fetching campaign data: " + new Date().toString());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount and every minute
  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 600000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  // Function to toggle showing SkyFury
  const toggleSkyFury = () => {
    setShowSkyFury(!showSkyFury);
  };

  // Function to toggle video mute status
  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <>
      <StaticBG />
      {showSkyFury && <SkyFury isVideoMuted={isVideoMuted} />} {/* Pass isVideoMuted status as prop */}
      <div className="wrapWrapper">
        <TransformWrapper>
          <TransformComponent>
            <DefaultZoomTools/>
            <div className="map">
              <img className="helldivers-grid" src={grid} alt="helldivers grid" />
              <img className="super-earth-icon" src={superEarth} alt="Super Earth icon" />
              {planets.map((planet, index) => (
                <Planet
                  key={index}
                  planetIndex={planet.index}
                  name={planet.name}
                  positionX={planet.position.x}
                  positionY={planet.position.y}
                  sector={planet.sector}
                  activeCampaign=""
                  health=""
                />
              ))}

              {campaigns.map((campaign, index) => (
                <div key={index}>
                  {planets
                    .filter((planet) => planet.name === campaign.planet.name)
                    .map((planet, index) => (
                      <Planet
                        key={index}
                        planetIndex={planet.index}
                        description={planet.biome.description}
                        owner={campaign.planet.event ? campaign.planet.event.faction : campaign.planet.currentOwner}
                        playerCount={campaign.planet.statistics.playerCount}
                        name={planet.name}
                        positionX={planet.position.x}
                        positionY={planet.position.y}
                        sector={planet.sector}
                        activeCampaign={campaign.planet.name}
                        health={(campaign.planet.event ? campaign.planet.event.health : campaign.planet.health)}
                        maxHealth={campaign.planet.maxHealth}
                      />
                    ))}
                </div>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <NewsFeed/>
      <Dispatches/>
      {planets.length <= 0 || campaigns.length <= 0 ? <div className='planets-loading'><h2>CONNECTING TO SUPER EARTH</h2></div> : ''}

      <ButtonControls 
        toggleSkyFury={toggleSkyFury} 
        toggleVideoMute={toggleVideoMute} 
        isVideoMuted={isVideoMuted} // Pass isVideoMuted status as prop
      /> {/* Pass toggleSkyFury and toggleVideoMute functions as props */}
      <div className='hex-overlay'></div>
    </>
  );
}
export default App;
