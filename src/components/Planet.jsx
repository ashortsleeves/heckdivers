export default function Planet ({ planetIndex, name, description, owner, playerCount, positionX, positionY, sector, activeCampaign, health, ...props }) {
    const x = positionX * 450;
    const y = -positionY * 450;
    const healthPercentage = health !== '' ? 100 - parseInt((health/1000000)*100) : null;

    const planetStyles = { 
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${planetIndex * 10}ms`,
    };

    const radarStyles = {
        animationDelay: `${planetIndex * 10}ms`,
    }

    const pieChartStyles = {
        background: `conic-gradient(
            rgb(177, 255, 174) 0,
            rgb(177, 255, 174) ${healthPercentage}%,
            rgb(255, 103, 103) 0,
            rgb(255, 103, 103) 100%
          )`
    }
    
    

    return (
        <div className={
            activeCampaign === name ? 'planet planet-active'
            : name === "SUPER EARTH" ? 'planet planet-earth'
            : 'planet planet-inactive'} style={planetStyles}>
            
            {radarStyles ? <span className="radar" style={radarStyles}></span> : ''}

            {activeCampaign === name ? 
                <>
                <span class="pie-chart" style={pieChartStyles}></span>
                    <p className="name">{name}</p>
                    <div className="planet-info">
                        <h3>{name}</h3>
                        <p>Under {owner} control</p>
                        <p>{playerCount} Helldivers</p>
                        <p className="name">{healthPercentage}% Liberated</p>
                        <p>{description}</p>
                    </div>
                </>
            : ''}
        </div>
    );  
}

