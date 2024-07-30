import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route,Routes, BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx'
import Coins from './components/Coins/Coins.jsx'
import Exchanges from './components/Exchanges/Exchanges.jsx'

const router = (
    <BrowserRouter basename="/cryptocurrency">
      <Routes>
        <Route path= "/" element= {<Layout />}>
        <Route index element={<Home />}/>
        <Route path="/Coins" element={<Coins />}/>
        <Route path="/Exchanges" element={<Exchanges />}/>
      </Route>
      </Routes>
    </BrowserRouter>
   )
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {router} 
  </React.StrictMode>,
);


reportWebVitals();
