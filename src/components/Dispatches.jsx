import React, {useState, useEffect } from 'react';

export default function NewsFeed() {
    const [dispatches, setDispatches] = useState([]);

    function findFirstLowerCaseIndex(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] !== str[i].toUpperCase()) {
                return i;
            }
        }
        return -1;
    }

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
        <>
            <div className='dispatches'>
                { dispatches.length > 0 ? (
                    dispatches.slice(0, 5).map((dispatch, index) => {

                        const dispatchUnHTML = dispatch.message ? dispatch.message.replace(/<[^>]*>/g, '') :'';

                        const dispatchLastCapsIndex = findFirstLowerCaseIndex(dispatchUnHTML);

                        const dispatchTitle = dispatchUnHTML.slice(0, dispatchLastCapsIndex - 1).replace(/(\r\n|\n|\r)/gm,'');

                        const dispatchClean = dispatchUnHTML.replace(dispatchTitle, '');

                        const keyWords = /Vernen Wells|Wezen|Terminids|Automatons|Terminid|Automaton|Supercolony|Meridia/g;

                        let dispatchContent = dispatchClean.replaceAll(keyWords, function(x) {
                            return '<strong>' + x + '</strong>';
                        });
                        return (
                            <div className={dispatch.message ? 'dispatch' : 'dispatch dispatch__hidden'} key={index}>
                                <h3 className={
                                    dispatchTitle == 'NEW MAJOR ORDER' ? 'yellow' :
                                    dispatchTitle == 'MAJOR ORDER WON' ? 'yellow' :
                                     ''
                                     }>{ dispatchTitle }</h3>
                                <span>{ dispatch.published ? dispatch.published : '' }</span>
                                <p dangerouslySetInnerHTML={{ __html: dispatchContent }} />
                            </div>
                        );
                    })
                ) : ''}
            </div>
        </>
    );
}