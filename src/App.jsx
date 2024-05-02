import React, { useState, useEffect } from 'react';
import Planet from './components/Planet';
import NewsFeed from './components/NewsFeed';
import VideoComponent from './components/VideoComponent';
import DefaultZoomTools from './components/DefaultZoomTools';
import planetsData from './planets.json';
import grid from './assets/grid.webp';
import reloadImg from './assets/reload.svg'
import saturnImg from './assets/planet-space-icon.svg';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import IlluminateAreHere from './components/IlluminateAreHere';

const headers = {"X-Super-Client": "Heckdivers", "X-Super-Contact": "gh/ashortsleeves"}

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const planets = planetsData;
  const [isRotating, setIsRotating] = useState(false);
  const [showIlluminate, setShowIlluminate] = useState(false);

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  if (isRotating) {
    document.body.classList.add('rotate-active');
  } else {
    document.body.classList.remove('rotate-active');
  }

  // Fetch data from APIs and update state
  const fetchData = async () => {
    try {
      const campaignsResponse = await fetch('https://api.helldivers2.dev/api/v1/campaigns', {headers: headers});
      const campaignsData = await campaignsResponse.json();
      setCampaigns(campaignsData);

      // Check if Illuminate are present
      const illuminatePresent = campaignsData.some(campaign => campaign.planet.currentOwner === 'Illuminate');
      setShowIlluminate(illuminatePresent);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount and every minute
  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 10000); // Fetch data every minute
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const showIlluminateTimer = setTimeout(() => {
      setShowIlluminate(false);
    }, 2000); // Show IlluminateAreHere for 10 seconds

    return () => clearTimeout(showIlluminateTimer);
  }, [showIlluminate]);

  function handleZoomClick(targetButtonID) {
    const secondButton = document.getElementById(targetButtonID);

    if (secondButton) {
      // Trigger a click event on the second button
      secondButton.click();
    }
  }

  return (
    <>
      <VideoComponent />
      {showIlluminate && <IlluminateAreHere />}
      <div className="wrapWrapper">
        <TransformWrapper>
          <TransformComponent>
            <DefaultZoomTools/>
            <div className="map">
              <img className="helldivers-grid" src={grid} alt="helldivers grid" />
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
                        owner={campaign.planet.currentOwner}
                        playerCount={campaign.planet.statistics.playerCount}
                        name={planet.name}
                        positionX={planet.position.x}
                        positionY={planet.position.y}
                        sector={planet.sector}
                        activeCampaign={campaign.planet.name}
                        health={campaign.planet.health}
                        maxHealth={campaign.planet.maxHealth}
                      />
                    ))
                  }
                </div>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <NewsFeed/>
      {planets.length <= 0 || campaigns.length <= 0 ? <div className='planets-loading'><h2>CONNECTING TO SUPER EARTH</h2></div> : ''}
      <div className='button-controls'>
        <button onClick={() => handleZoomClick('zIn')}>+ <span>Zoom In</span></button>
        <button onClick={() => handleZoomClick('zOut')}>- <span>Zoom Out</span></button>
        <button onClick={toggleRotation}><img src={saturnImg} alt="Saturn Icon"/> <span>Toggle Rotation</span></button>
        <button onClick={() => location.reload()}><img src={reloadImg} alt="reload network"/> <span>Reload Network</span></button>
        
        <div>
          <a href="https://heckdivers.net" target="_blank">heckdivers.net</a>
          <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3235505289" target="_blank">wallpaper engine</a>
          <a href="https://github.com/ashortsleeves" target="_blank">github</a>
        </div>

      </div>
    </>
  );
}
export default App;
