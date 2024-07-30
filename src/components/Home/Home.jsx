import React from 'react'
import icon from './bitcoin.png';
import './Home.css'
import CryptoStats from '../CryptoStats/CryptoStats.jsx'

function Home(){
    return (
        <>
        <div className="main-container ">
            <div className="img-container">
                <div className="image">
                <img
                  src={icon}
                  alt="bitcoin"
                  className="image-1"
                  
                />
                </div>
                <div className="text">
                    <div className="heading">
                       CRYPTOVERSE
                    </div>
                    <div className="heading-1">
                        Your Crypto Encyclopedia is Here
                    </div>
                </div>
            </div>
            
                <CryptoStats />
                

            
        </div>


        
        </>
    )
}

export default Home