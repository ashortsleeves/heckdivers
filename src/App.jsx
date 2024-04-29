import React, { useState, useEffect } from 'react';
import Planet from './components/Planet';
import NewsFeed from './components/NewsFeed';
import VideoComponent from './components/VideoComponent';
import planetsData from './planets.json';
import './App.css';
import grid from './assets/grid.webp';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';


function App() {
  const [campaigns, setCampaigns] = useState([]);
  const planets = planetsData;

  // Fetch data from APIs and update state
  const fetchData = async () => {
    try {
      const campaignsResponse = await fetch('https://api.helldivers2.dev/api/v1/campaigns');
      const campaignsData = await campaignsResponse.json();
      setCampaigns(campaignsData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount and every minute
  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 10000); // Fetch data every minute
    console.log('fetch data attempt')
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <VideoComponent />
      <div className="wrapWrapper">
        <TransformWrapper>
          <TransformComponent>
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
                        owner={planet.currentOwner}
                        playerCount={planet.statistics.playerCount}
                        name={planet.name}
                        positionX={planet.position.x}
                        positionY={planet.position.y}
                        sector={planet.sector}
                        activeCampaign={campaign.planet.name}
                        health={planet.health}
                      />
                    ))}
                </div>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <NewsFeed />
      
      {planets.length <= 0 || campaigns.length <= 0 ? <div className='planets-loading'><h2>CONNECTING TO SUPER EARTH</h2></div> : ''}
    </>
  );
}
export default App;
