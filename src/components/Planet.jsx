export default function Planet ({ name, positionX, positionY, sector, activeCampaign, health, ...props }) {
    const x = positionX * 450;
    const y = -positionY * 450;
    const styles = { 
        transform: `translate(${x}px, ${y}px)`,
        // backgroundColor: activeCampaign == name ? '#ed1909' : '#efefef',
        backgroundColor: activeCampaign == name ? '#ed1909' : '#000000',
    };

    return (
        <div className="planet" style={styles}>
            
            {activeCampaign === name ? <p>{name}</p>: ''}
            {health !== '' ? <p>{health}</p> : ''}
        </div>
    );  
}