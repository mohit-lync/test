import React, { useState, useEffect } from 'react';
import './CryptoStats.css'

const CryptoStats = () => {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/global');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data);  
                console.log(response);
            } catch (err) {
                setError(err.message);  
            } finally {
                setLoading(false);  
            }
        };

        fetchData();  
    }, []);  
    
    if (loading) {
        return <div className='load'>Loading...</div>;  
    }

    if (error) {
        return (
            <p className="error-msg">
            We are facing some issues. <br />
            Please check again after some time.
        </p>
        );  
    }

    if (!data) {
        return <div>No data available</div>;  
    }

    
    const activeCryptocurrencies = parseInt(data.active_cryptocurrencies).toLocaleString('en-US');
    const marketCapChange = parseFloat(data.market_cap_change_percentage_24h_usd).toFixed(2);

    return (
        <div className="crypto-stats-container">
            <div className="crypto-text">
            <h2>GLOBAL CRYPTO STATS -</h2>
            </div>
            <div className="data-container">
            <div className="content">
                <p className="content-name">Active Cryptocurrencies:</p>
                <p className="content-value">{activeCryptocurrencies}</p>
            </div>
            <div className="content">
                <p className="content-name">Ongoing ICOs:</p>
                <p className="content-value">{data.ongoing_icos}</p>
            </div>
            <div className="content">
                <p className="content-name">Total Markets:</p>
                <p className="content-value">{data.markets}</p>
            </div>
            <div className="content">
                <p className="content-name">Daily Market Cap Change:</p>
                <p className="content-value">{marketCapChange} %</p>
            </div>
            </div>
        </div>
    );
};

export default CryptoStats;
