import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import StockList from "../../Components/StockList/StockList";
import StockSearch from "../../Components/StockSearch/StockSearch";

import "./Stock.css";
import { fetchPost } from "../../util/fetchHelp";

const Stock = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [tickerSymbols, setTickerSymbols] = useState();

  useEffect(() => {
    fetchPost('/read_ticker_symbols', {}).then(data => {
      setTickerSymbols(data['ticker_symbols']);
      console.log(data);
    });
  }, []);

  return (
    <div className="Stock-Container">
      <div className="Stock-List">
        {/*<StockList tickerSymbols={tickerSymbols}/>*/}
      </div>
      <div className="Checkout">
      <div className="Stock-Search">
        {tickerSymbols && <StockSearch tickerSymbols={tickerSymbols}/>}
      </div>
        {/* Add content for Checkout if needed */}
      </div>
    </div>
  );
};

export default Stock;
