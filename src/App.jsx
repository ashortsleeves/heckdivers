import React, { useState, useEffect } from 'react';
import Planet from './components/Planet';
import './App.css';
import grid from './assets/grid.webp';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import VideoComponent from './components/VideoComponent';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);
  const [majorOrder, setMajorOrder] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Keep track of the index of the active component

  // Fetch data from APIs and update state
  const fetchData = async () => {
    try {
      const campaignsResponse = await fetch('https://api.helldivers2.dev/api/v1/campaigns');
      const campaignsData = await campaignsResponse.json();
      setCampaigns(campaignsData);

      const planetsResponse = await fetch('https://api.helldivers2.dev/api/v1/planets');
      const planetsData = await planetsResponse.json();
      setPlanets(planetsData);

      const newsFeedResponse = await fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801');
      const newsFeedData = await newsFeedResponse.json();
      setNewsFeed(newsFeedData);

      const majorOrderResponse = await fetch('https://api.helldivers2.dev/api/v1/assignments');
      const majorOrderData = await majorOrderResponse.json();
      setMajorOrder(majorOrderData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount and every minute
  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute
    console.log('fetch data attempt')
    return () => clearInterval(intervalId);
  }, []);

  // Rotate through components every 20 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 10); // Rotate through components
    }, 20000); // Rotate every 20 seconds

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

      <div className="news-feed">
        <div className="major-order">
          {majorOrder.length > 0 ? (
            majorOrder.map((order, index) => (
              <div key={index}>
                <h2>MAJOR ORDER</h2>
                <p>{order.briefing}</p>
              </div>
            ))
          ) : (
            <p>Receiving Major Order data</p>
          )}
        </div>
        <div className="breaking-news">
          {newsFeed.length > 0 ? (
            <h3>BREAKING NEWS:</h3>
          ) : (
            <p>Retrieving Super Earth News...</p>
          )}
          
          {newsFeed.map((news, index) =>
            index === activeIndex ? (
              <span className="typewriter" style={{ '--n': news.message.length }} key={index}>
                {news.message}
              </span>
            ) : null
          )}
        </div>
      </div>
      {planets.length <= 0 || campaigns.length <= 0 ? <div className='planets-loading'><h2>CONNECTING TO SUPER EARTH</h2></div> : ''}
    </>
  );
}
export default App;
