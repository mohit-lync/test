import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import './components/Header/Header.css'




function Layout(){
    return(
        <div className="index">
        <Header />
        <Outlet />
        </div>
    )
}

export default Layout