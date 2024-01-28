import { useAuth0 } from "@auth0/auth0-react";
import Graph from '../../Components/Graph/Graph';
import React, { useEffect, useState } from 'react';
import StockList from "../../Components/StockList/StockList";
import StockSearch from "../../Components/StockSearch/StockSearch";

import "./Stock.css";
import { fetchPost } from "../../util/fetchHelp";
import { Button } from "@mui/material";

const Stock = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [tickerSymbols, setTickerSymbols] = useState();
  const [price, setPrice] = useState();
  const [symbol, setSymbol] = useState();

  useEffect(() => {
    fetchPost('/read_ticker_symbols', {}).then(data => {
      setTickerSymbols(data['ticker_symbols']);
      console.log(data);
    });
  }, []);

  function getStock(tickerSymbol) {
    fetchPost('/read_stock_history', {'ticker_symbol': tickerSymbol}).then(data => {
      setSymbol(tickerSymbol);
      setPrice([1, data['history']]);
    });
  }

  function buy() {
    fetchPost('/buy_stock', {'name': user.name, 'ticker_symbol': symbol});
  }

  function sell() {
    fetchPost('/sell_stock', {'name': user.name, 'ticker_symbol': symbol});
  }

  return (
    <div className="Stock-Search-Container">
      <div className="Checkout">
        <div className="Stock-Search">
          {tickerSymbols && <StockSearch tickerSymbols={tickerSymbols} getStock={getStock}/>}
        </div>
          {/* Add content for Checkout if needed */}
      </div>

      { symbol && <div className='Stock-Container'>
              <div key={symbol} className='Card'>
                  <div className='Stock-Info'>
                      <p>Stock: {symbol} ({price[0]})</p>
                      <p>Price: {price[1][price[1].length - 1]}</p>
                      {price[1][price[1].length - 1] - price[1][price[1].length - 2] >= 0 ? (
                          <p style={{color:"green"}}>
                              +{(((price[1][price[1].length - 1] - price[1][price[1].length - 2]) / price[1][price[1].length - 2]) * 100).toFixed(2)}%
                          </p>
                      ) : (
                          <p style={{color:"red"}}>
                              {(((price[1][price[1].length - 1] - price[1][price[1].length - 2]) / price[1][price[1].length - 2]) * 100).toFixed(2)}%
                          </p>
                      )}
                  </div>
                  <div className='Stock-Graph'>
                      <Graph data = {price[1]} hoverInfo = {false}/>
                  </div>
                      
              </div>
      </div> }

      {isAuthenticated && symbol && <div className="Transaction-Container">
        <Button onClick={buy}>Buy</Button>
        <Button onClick={sell}>Sell</Button>
      </div>}
    </div>
  );
};

export default Stock;
