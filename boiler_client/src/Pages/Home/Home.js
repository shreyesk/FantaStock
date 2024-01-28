import React, { useEffect, useState } from 'react';
import Graph from '../../Components/Graph/Graph';
import { fetchPost } from '../../util/fetchHelp';
import "./Home.css";

const Home = () => {
    // const [stockData, setStockData] = useState({"APPL": [3, [1, 2, 3, 4, 5, 20]], "TSLA": [4, [6, 5, 4, 3, 12, 2]]})
    const [stockData, setStockData] = useState();
    const [wealthData, setWealthData] = useState();
    const postStockData = {"ticker_symbol": 'AAPL', 'days': 30};
    //const postWealthData = {}
    
    //NEED A POST REQUEST TO GET USER STOCKS!
    useEffect(() => {
        fetchPost("/read_stock_history", postStockData).then(data => {
            setStockData({'AAPL': [1, data['history']]});
        })
        
    }, []); // Empty dependency array ensures this runs once
    // useEffect(() => {
    //     fetchPost("/read_stock_history", postWealthData).then(data => {
    //         setStockData({'AAPL': [1, data['history']]});
    //     })
        
    // }, []);
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
                    ))}
                </div>
                <div className='Graph-Container'>
                    <div className='Graph-Holder'>
                        <Graph data={[175.46, 172.88, 173.0, 173.44, 171.1, 166.89, 168.22, 170.29, 170.77, 173.97, 177.57, 176.65, 179.23, 181.82, 182.89, 182.41, 186.4, 184.8, 187.44, 188.01, 189.71, 189.69, 191.45, 190.64, 191.31, 189.97, 189.79, 190.4, 189.37, 189.95]} hoverInfo={true}/>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Home;
