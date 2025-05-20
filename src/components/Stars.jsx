import { useEffect, useState } from 'react';

function Stars() {
    const [showStars2, setShowStars2] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowStars2(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="stars stars-1"></div>
            {showStars2 && <div className="stars stars-2"></div>}
        </>
    );
}

export default Stars;
