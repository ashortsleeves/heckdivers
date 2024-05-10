import React, { useState, useEffect } from 'react';

export default function NewsFeed() {
    const [newsFeed, setNewsFeed] = useState([]);
    const [majorOrder, setMajorOrder] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0); // Keep track of the index of the active component

    const fetchData = async () => {
        try {
            const majorOrderResponse = await fetch('https://raw.githubusercontent.com/ashortsleeves/heckdivers-json/main/assignments.json');
            const majorOrderData = await majorOrderResponse.json();
            setMajorOrder(majorOrderData);

            const newsFeedResponse = await fetch('https://raw.githubusercontent.com/ashortsleeves/heckdivers-json/main/newsfeed.json');
            const newsFeedData = await newsFeedResponse.json();
            setNewsFeed(newsFeedData);
            console.log("fetching assignments and newsfeed: " + new Date().toString());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

      // Fetch data on component mount and every minute
    useEffect(() => {
        fetchData(); // Fetch data initially
        const intervalId = setInterval(fetchData, 600000); // Fetch data every minute
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
                <div className="major-order" key="index">
                    <div key={index}>
                    <h2>MAJOR ORDER</h2>
                        <p>{order.briefing}</p>
                    </div>
                </div>
            ))
            ) : ''}
            
            <div className="breaking-news">
                {newsFeed.length > 0 ? (
                    <h3>BREAKING NEWS<span>:</span></h3>
                ) : ''}

                {newsFeed.map((news, index) =>
                    index === activeIndex ? (
                        <span className="typewriter" style={{ '--n': (news && news.message && news.message.length !== undefined ? news.message.length : 700)}} key={index}>
                            {news.message}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}
