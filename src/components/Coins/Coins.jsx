import React, { useState, useEffect } from 'react';
import downIcon from './down.png';
import neutralIcon from './neutral.png';
import upIcon from './up.png';
import icons from './search.png'
import './Coins.css'

const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currency, setCurrency] = useState('inr');
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

   
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (err) {
            setError('We are facing some issue. Please check again after some time.');
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currency, page]); 

    const handlePreviousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < 50) {
            setPage(page + 1);
        }
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filteredResult = data.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
        setData(filteredResult);
    };

    const getPriceChangeDetails = (priceChange) => {
        if (priceChange < 0) {
            return {
                className: 'down',
                imageSrc: downIcon,
                altText: 'down'
            };
        }
        if (priceChange === 0) {
            return {
                className: 'neutral',
                imageSrc: neutralIcon,
                altText: 'neutral'
            };
        }
        return {
            className: 'up',
            imageSrc: upIcon,
            altText: 'up'
        };
    };

    

    return (
        <div className="crypto-container">
            <div className="page-heading">
                <h1>Cryptocurrencies</h1>
            </div>
            <div className="actions-container">
                <div className="currency-changebtns-container">
                    <div className="currency-change-btns">
                        <input
                            type="radio"
                            name="currencySymbolBtns"
                            value="inr"
                            id="inr"
                            checked={currency === 'inr'}
                            onChange={handleCurrencyChange}
                            className="currency-btns"
                        />
                        <label htmlFor="inr">INR</label>
                    </div>
                    <div className="currency-change-btns">
                        <input
                            type="radio"
                            name="currencySymbolBtns"
                            value="usd"
                            id="usd"
                            checked={currency === 'usd'}
                            onChange={handleCurrencyChange}
                            className="currency-btns"
                        />
                        <label htmlFor="usd">USD</label>
                    </div>
                    <div className="currency-change-btns">
                        <input
                            type="radio"
                            name="currencySymbolBtns"
                            value="eur"
                            id="eur"
                            checked={currency === 'eur'}
                            onChange={handleCurrencyChange}
                            className="currency-btns"
                        />
                        <label htmlFor="eur">EUR</label>
                    </div>
                </div>

                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        className='input-search-field'
                        name="currency"
                        id="currency"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search Cryptocurrency (Eg. Bitcoin)"
                        autoComplete="off"
                    />
                    <button type="submit" >
                        <img src={icons} alt="search"
                        className="search-icon" />
                    </button>
                </form>
            </div>
            <div className="coins-card-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <div className="error">
                        <span className="ghost-img">
                            <img src="./app/assets/ghost-fill.svg" alt="ghost" />
                        </span>
                        <p className="error-msg">{error}</p>
                    </div>
                ) : (
                    data.map((item) => {
                        const { className, imageSrc, altText } = getPriceChangeDetails(item.price_change_percentage_24h);

                        return (
                            <div key={item.id} className="coins-card">
                                <div className="coin-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="name-symbol">
                                    <p className="coin-name">{item.name}</p>
                                    <p className="coin-symbol">({item.symbol})</p>
                                </div>
                                <p className="current-price">
                                    {currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€'} {parseFloat(item.current_price).toLocaleString('en-US')}
                                </p>
                                <div className={`price-change-container ${className}`}>
                                    <img src={imageSrc} alt={altText} className="arrow-img" />
                                    <p className="price-change-value">{item.price_change_percentage_24h.toFixed(2)} %</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="pagination-btns">
                <div>
                <button onClick={handlePreviousClick} id="previous" disabled={page === 1}>Previous</button>
                </div>
                <div>
                <button onClick={handleNextClick} id="next" disabled={page === 50}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
