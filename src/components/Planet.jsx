import './Planet.css';

export default function Planet ({ planetIndex, name, description, owner, playerCount, positionX, positionY, sector, activeCampaign, health, maxHealth, ...props }) {
    const x = positionX * 450;
    const y = -positionY * 450;
    const healthPercentage = health !== '' ? 100 - ((health/maxHealth)*100) : null;

    const ownerColor = owner === 'Terminids' ? 'rgb(250, 250, 0)' : 'rgb(255, 103, 103)';

    const heckDiverColor = owner === 'Terminids' ? 'rgb(104, 198, 101)' : 'rgb(177, 255, 174)';

    const planetStyles = { 
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${planetIndex * 10}ms`,
    };

    const radarStyles = {
        animationDelay: `${planetIndex * 10}ms`,
    }

    const pieChartStyles = {
        background: `conic-gradient(
            ${heckDiverColor} 0,
            ${heckDiverColor} ${healthPercentage}%,
            ${ownerColor} 0,
            ${ownerColor} 100%
          )`
    }

    const nameStyles = {
        animation: `blink ${planetIndex / 5}s linear infinite`
    }

    return (

        <div className={
            activeCampaign === name ? 'planet planet-active planet-'+ owner
            : name === "SUPER EARTH" ? 'planet planet-earth'
            : 'planet planet-inactive'} style={planetStyles}>

            <div className='planet-wrap'>
                {radarStyles ? <span className="radar" style={radarStyles}></span> : ''}

                {activeCampaign === name ? 
                    <>
                    <span className="pie-chart" style={pieChartStyles}></span>
                        <p className="name" style={nameStyles}>{name}</p>
                        <div className="planet-info">
                            <h3>{name}</h3>
                            <p>Under {owner} control</p>
                            <p>{playerCount} Helldivers</p>
                            <p>{Math.round(healthPercentage * 10000) / 10000}% Liberated</p>
                            <p>{description}</p>
                        </div>
                    </>
                : <p className="name name-hover">{name}</p>}
            </div>
        </div>
    );  
}

