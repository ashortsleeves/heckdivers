import React, {useState, useEffect } from 'react';

export default function NewsFeed() {
    const [dispatches, setDispatches] = useState([]);

    const fetchData = async () => {
        try {
            const dispatchesResponse = await fetch('https://raw.githubusercontent.com/ashortsleeves/heckdivers-json/main/dispatches.json');
            const dispatchesData = await dispatchesResponse.json();
            setDispatches(dispatchesData);
            console.log("fetching dispatches: " + new Date().toString());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData(); // Fetch data initially
        const intervalId = setInterval(fetchData, 600000); // Fetch data every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='dispatches'>
            <h1>test</h1>
            {dispatches.length > 0 ? (
                dispatches.map((dispatch, index) => (
                    <div className="dispatch" key={index}>
                        <div dangerouslySetInnerHTML={{ __html: dispatch.message }} />
                    </div>
                ))
            ) : ''}
        </div>
    );
}