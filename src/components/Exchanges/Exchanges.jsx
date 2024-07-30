import React from 'react'
import { useEffect, useState } from 'react'
import './Exchanges.css'
import icon from './link.png';

const Exchanges = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/exchanges');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.slice(0,10));  
                console.log(response);
            } catch (err) {
                setError(err.message);  
            } finally {
                setLoading(false);  
            }
        };

        fetchData();  
    }, []);  

    const fetchAllExchanges = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/exchanges');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result); 
            setShowAll(true); 
        } catch (err) {
            setError(err.message);
        }
    };
    const showInitialExchanges = () => {
        setData(data.slice(0, 10)); 
        setShowAll(false); 
    };


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <p className="exchange-error-msg">
           ERROR RETRIEVING THE DATA!! <br />
            
        </p>
        );  
    }

    if (!data || data.length === 0 ) {
        return <div>No data available</div>;  
    }



    return (
    <div className="exchanges-container">
            <div className="headings">
               <h1> Top Exchanges </h1>
            </div>
            <div className="all-cards">

              {data.map((exchange) => (
                  <div key={exchange.id} className="exchange-item">

                    <div className="exchange-ranking">
                        {exchange.trust_score_rank}
                    </div>

                    <div className="all-3">

                    <div className="exchange-img">
                        <img src={exchange.image} alt={exchange.name} />
                    </div>

                    <p title={exchange.name} className="exchange-name">{exchange.name}</p>

                    <span className="exchange-link">
                        <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                            <img src={icon} alt="link" />
                        </a>
                    </span>
                    </div>
                </div>    
            ))}
        </div>
        {!showAll ? (
                <div className="footer-btn">
                    <button onClick={fetchAllExchanges}>Show All Exchanges</button>
                </div>
            ) : (
                <div className="footer-btn">
                    <button onClick={showInitialExchanges}>Show Top Exchanges</button>
                </div>
            )}
    </div>    
    );
};

export default Exchanges;