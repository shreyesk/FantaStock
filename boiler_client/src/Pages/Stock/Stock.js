import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import StockList from "../../Components/StockList/StockList";
import StockSearch from "../../Components/StockSearch/StockSearch";

import "./Stock.css";

const Stock = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="Stock-Container">
      <div className="Stock-List">
        <StockList />
      </div>
      <div className="Checkout">
      <div className="Stock-Search">
        <StockSearch />
      </div>
        {/* Add content for Checkout if needed */}
      </div>
    </div>
  );
};

export default Stock;
