import { useState, useEffect } from 'react'
import Planet from './components/Planet';
import './App.css'
import grid from './assets/grid.webp';

function App() {
const [campaigns, setCampaigns] = useState([]);
const [planets, setPlanets] = useState([]);

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

    return (
      <div className='map'>
        <img className="helldivers-grid" src={grid} alt="helldivers grid"/>
        {planets
          .map((planet, index) => (
            <Planet
              key={index}
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
    );
}
export default App;

