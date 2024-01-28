import React, { useState, useEffect } from 'react';
import Graph from '../../Components/Graph/Graph';
import "./Home.css";
import { fetchPost } from '../../util/fetchHelp';

const Home = () => {
    // const [stockData, setStockData] = useState({"APPL": [3, [1, 2, 3, 4, 5, 20]], "TSLA": [4, [6, 5, 4, 3, 12, 2]]})
    const [stockData, setStockData] = useState();

    const postStockData = {"ticker_symbol": 'AAPL', 'days': 30};

    useEffect(() => {
        fetchPost("/read_stock_history", postStockData).then(data => {
            console.log(data);
            setStockData({'AAPL': [1, data['history']]});
        })
    }, []); // Empty dependency array ensures this runs once

    return (
        <div>
            <div className='Main-Container'>
                <div className='Stock-Container'>
                    {stockData && Object.entries(stockData).map(([symbol, price]) => (
                        <div key={symbol} className='Card'>
                            <div className='Stock-Info'>
                                <p>Stock: {symbol} ({price[0]})</p>
                                <p>Price: {price[1][price[1].length - 1]}</p>
                                {price[1][price[1].length - 1] - price[1][price[1].length - 2] >= 0 ? (
                                    <p style={{color:"green"}}>+{(((100 *(price[1][price[1].length - 1] - price[1][price[1].length - 2])) / price[1][price[1].length - 2]) - 100).toFixed(2)}% </p>
                                ) : (
                                    <p style={{color:"red"}}>{(((100 *(price[1][price[1].length - 1] - price[1][price[1].length - 2])) / price[1][price[1].length - 2]) - 100).toFixed(2)}%</p>
                                )}
                            </div>
                            <div className='Stock-Graph'>
                                <Graph data = {price[1]} hoverInfo = {false}/>
                            </div>
                                
                        </div>
                    ))}
                </div>
                <div className='Graph-Container'>
                    <Graph data={[1, 2, 6, 5, 9, 4, 5]} hoverInfo={true}/>
                </div>
            </div>
        </div>
    );
}

export default Home;
