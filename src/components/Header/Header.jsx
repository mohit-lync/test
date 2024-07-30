import React from 'react'
import { NavLink} from 'react-router-dom'
import './Header.css'
function Header(){
    return(
        <>
        <div className="header">
                    <div className="navbar">
                        <ul className="items">
                            <li>
                                <NavLink to="/"
                                 className=" "
                                > 
                                HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/Coins"
                                 className=""
                                > 
                                COINS
                                </NavLink>
                            </li>
                            <li>
                                <NavLink  to ="/Exchanges"
                                 className=""
                                > 
                                EXCHANGES
                                </NavLink>
                            </li>
                        </ul>
                    </div>    
         </div>
        </>
    )
}

export default Header