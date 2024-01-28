// Main.js

import React from 'react';
import StockGraph from './StockGraph';
import InvestmentDetails from './InvestmentDetails';
import './Landing.css'; // Import the CSS file for styling

const Main = () => {
  return (
    <div>      <h1>FantaStock</h1>
    
        <div className="app-container">
            
        <div className="left-card-container">
            <div className="card">
            <p><span>HOVER ME 1</span></p>
            </div>
            <div className="card">
            <p><span>HOVER ME 2</span></p>
            </div>
            <div className="card">
            <p><span>HOVER ME 3</span></p>
            </div>
        </div>
        <div className="back">
        <div className="app-main">
            {/* <StockGraph /> */}
            <InvestmentDetails />
        </div>
        </div>

        </div>
        </div>
  );
}

export default Main;
