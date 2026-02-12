import { useEffect, useState } from 'react';
import automatonIcon from '../assets/media/automaton.webp';
import terminidIcon from '../assets/media/terminid.png';
import illuminateIcon from '../assets/media/illuminate.png';
import helmetIcon from '../assets/media/helmet.png';
import superEarthIcon from '../assets/media/Super_earth.webp';
import dssIcon from '../assets/media/dss.png';

export default function Planet({ planetIndex, name, description, owner, playerCount, positionX, positionY, sector, activeCampaign, health, maxHealth, dss, ...props }) {
    const [transformScale, setTransformScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const transformComponent = document.querySelector('.react-transform-component');
            if (transformComponent) {
                const style = window.getComputedStyle(transformComponent);
                const transform = style.transform;
                const matrix = new DOMMatrix(transform);
                setTransformScale(matrix.m11); // m11 is the scale factor in the transformation matrix
            }
        };

        // Initial check
        updateScale();

        // Set up observer to watch for transform changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style') {
                    updateScale();
                }
            });
        });

        const transformComponent = document.querySelector('.react-transform-component');
        if (transformComponent) {
            observer.observe(transformComponent, { attributes: true });
        }

        return () => observer.disconnect();
    }, []);

    const x = positionX * 450;
    const y = -positionY * 450;
    const healthPercentage = health !== ''
        ? Math.max(0, Math.min(100, 100 - ((health / maxHealth) * 100)))
        : null;

    const ownerColor = owner === 'Terminids' ? 'rgb(250, 250, 0)' :
        owner === 'Humans' ? 'rgb(177, 255, 174)' : owner === 'Illuminate' ? 'rgb(223 168 255)' : 'rgb(255, 103, 103)';

    const planetStyles = {
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${planetIndex * 10}ms`,
    };

    const radarStyles = {
        animationDelay: `${planetIndex * 10}ms`,
    }

    const pieChartStyles = {
        background: `conic-gradient(
            #27A5FC 0,
            #27A5FC ${healthPercentage}%,
            ${ownerColor} 0,
            ${ownerColor} 100%
          )`
    }

    const healthBarStyles = {
        left: `calc(${healthPercentage}% + 6px)`
    }

    const nameStyles = {
        animation: `blink ${planetIndex / 5}s linear infinite`
    }

    const planetInfoStyles = {
        transform: `scale(${1 / transformScale})`,
        transformOrigin: 'top left'
    };

    // Add custom description for Super Earth
    const planetDescription = name === "SUPER EARTH"
    ? "The cradle of Managed Democracy and the heart of human civilization, where every citizen enjoys the freedom to serve Super Earth."
        : description;

    return (
        <div className={
            activeCampaign === name ? 'planet planet-active planet-' + owner + ' planet-' + name
                : name === "SUPER EARTH" ? 'planet planet-earth'
                    : dss ? 'planet planet-inactive planet-dss'
                        : 'planet planet-inactive'} style={planetStyles}>

            <div className='planet-wrap'>
                {radarStyles ? <span className="radar" style={radarStyles}></span> : ''}

                {activeCampaign === name ?
                    <>
                        <span className="pie-chart" style={pieChartStyles}></span>
                        <p className="name" style={nameStyles}>{name}</p>
                        <div className="planet-info" style={planetInfoStyles}>
                            <div className="detail-wrap">
                                <h3>
                                    {
                                        owner === 'Terminids' ? <img src={terminidIcon} alt="Under Terminid Control" /> :
                                            owner === 'Automaton' ? <img src={automatonIcon} alt="Under Automaton Control" /> :
                                                owner === 'Illuminate' ? <img src={illuminateIcon} alt="Under Illuminate Control" /> :
                                                    owner === 'Humans' ? <img src={superEarthIcon} alt="Under Super Earth Control" /> :
                                                        ''
                                    }
                                    {name}
                                </h3>
                            </div>
                            <div className="detail-wrap">
                                <div className="detail-wrap-inner">
                                    <div className="health-block"><span style={healthBarStyles}></span></div>
                                    <div className="health-percent">
                                        {Math.round(healthPercentage * 10000) / 10000}% LIBERATED
                                        <strong>|</strong>
                                        <span><img src={helmetIcon} alt="Helldiver Count" /> {playerCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-wrap">
                                <p>{planetDescription}</p>
                            </div>
                        </div>
                    </>
                    : <p className="name name-hover">{name}</p>}
            </div>
            {dss ? <div className='dssIcon'><img src={dssIcon} alt="Democracy Space Station" /><p>Democracy Space Station</p></div> : null}
        </div>
    );
}

