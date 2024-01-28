
import React from 'react';
import StockGraph from './StockGraph';
import InvestmentDetails from './InvestmentDetails';
import './Landing.css'; // Import the CSS file for styling

import StockSearch from './StockSearch';

const SearchPage = () => {
    return (
    <div class="searchContainer"> 
        <div className="app-container">
            <div className="back">
                <div className="app-main">
                    {/* <StockGraph /> */}
                    {/* <InvestmentDetails /> */}
                </div>
            <StockSearch/>    
            </div>
        </div>
    </div>
    );
  }
  
  export default SearchPage;