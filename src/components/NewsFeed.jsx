import React, { useState, useEffect } from 'react';
import './NewsFeed.css';

export default function NewsFeed() {
    const [newsFeed, setNewsFeed] = useState([]);
    const [majorOrder, setMajorOrder] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // Keep track of the index of the active component

    const fetchData = async () => {
        try {
            const majorOrderResponse = await fetch('https://api.helldivers2.dev/api/v1/assignments');
            const majorOrderData = await majorOrderResponse.json();
            setMajorOrder(majorOrderData);

            const newsFeedResponse = await fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801');
            const newsFeedData = await newsFeedResponse.json();
            setNewsFeed(newsFeedData);
      
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

      // Fetch data on component mount and every minute
    useEffect(() => {
        fetchData(); // Fetch data initially
        const intervalId = setInterval(fetchData, 10000); // Fetch data every minute
        console.log('fetch newsfeed')
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % 10); // Rotate through components
        }, 20000); // Rotate every 20 seconds
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className="news-feed">
            
            {majorOrder.length > 0 ? (
            majorOrder.map((order, index) => (
                <div className="major-order"> 
                    <div key={index}>
                        <h2>MAJOR ORDER</h2>
                        <p>{order.briefing}</p>
                    </div>
                </div>
            ))
            ) : ''}
            
            <div className="breaking-news">
                {newsFeed.length > 0 ? (
                    <h3>BREAKING NEWS:</h3>
                ) : (
                    <p>Retrieving Super Earth News...</p>
                )}

                {newsFeed.map((news, index) =>
                    index === activeIndex ? (
                        <span className="typewriter" style={{ '--n': (news.message.length !== 'undefined' ? news.message.length : 700)}} key={index}>
                            {news.message}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}