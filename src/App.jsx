import { useState, useEffect, Component } from 'react'
import Planet from './components/Planet';
import './App.css'
import grid from './assets/grid.webp';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import VideoComponent from './components/VideoComponent';

function App() {
const [campaigns, setCampaigns] = useState([]);
const [planets, setPlanets] = useState([]);
const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    fetch('https://api.helldivers2.dev/api/v1/campaigns')
      .then(response => response.json())
      .then(campaigns => setCampaigns(campaigns))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('https://api.helldivers2.dev/api/v1/planets')
      .then(response => response.json())
      .then(planets => setPlanets(planets))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801')
      .then(response => response.json())
      .then(newsFeed => setNewsFeed(newsFeed))
      .catch(error => console.error(error));
  }, []);

  const [activeIndex, setActiveIndex] = useState(0); // Keep track of the index of the active component

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % 10); // Rotate through components
    }, 10000); // Rotate every 20 seconds

    return () => clearInterval(intervalId);
  }, []);








  return (
    <>
      <VideoComponent/>

      <TransformWrapper>
        <TransformComponent>
          <div className='map'>
            <img className="helldivers-grid" src={grid} alt="helldivers grid"/>

            {planets
              .map((planet, index) => (
                <Planet
                  key={index}
                  planetIndex={planet.index}
                  name={planet.name}
                  positionX={planet.position.x}
                  positionY={planet.position.y}
                  sector={planet.sector}
                  activeCampaign=''
                  health=''
                  />
            ))}

            {campaigns.map((campaign, index) => (
              <div key={index}>
                {planets
                .filter(planet => planet.name === campaign.planet.name)
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

      <div class="news-feed">
      {newsFeed.map((news, index) => (
        
        index === activeIndex ? <span className="typewriter" style={{'--n':news.message.length}} key={index}>{news.message}</span> : null
      ))}</div>
    </>
  );
}
export default App;

