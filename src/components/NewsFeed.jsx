import { useState, useEffect } from 'react';
import wingLeft from '../assets/media/wing-left.png';
import wingRight from '../assets/media/wing-right.png';

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
            // Sort newsFeed by timestamp, newest first
            const sortedNewsFeed = newsFeedData.sort((a, b) => {
                const dateA = a.published ? new Date(a.published) : new Date(0);
                const dateB = b.published ? new Date(b.published) : new Date(0);
                return dateB - dateA;
            });
            setNewsFeed(sortedNewsFeed);
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
                    <h2><img src={wingLeft} alt="Left Wing Icon" />MAJOR ORDER<img src={wingRight} alt="Right Wing Icon" /></h2>
                        <p>{order.briefing}</p>
                    </div>
                </div>
            ))
            ) : ''}
            
            <div className="breaking-news">
                {newsFeed.length > 0 ? (
                    <h3>BREAKING NEWS<span>:</span></h3>
                ) : ''}

                {newsFeed.map((news, index) => {
                    const newsUnHTML = news.message ? news.message.replace(/<[^>]*>/g, '') : '';
                    return index === activeIndex ? (
                        <span className="typewriter" style={{ '--n': (newsUnHTML.length + 30)}} key={index}>
                            {newsUnHTML}
                        </span>
                    ) : null
                })}
            </div>
        </div>
    );
}
