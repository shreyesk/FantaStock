import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Graph from '../../Components/Graph/Graph';
import { fetchPost } from '../../util/fetchHelp';
import "./Home.css";

const Home = () => {
    // const [stockData, setStockData] = useState({"APPL": [3, [1, 2, 3, 4, 5, 20]], "TSLA": [4, [6, 5, 4, 3, 12, 2]]})
    const [stockData, setStockData] = useState();
    const [wealthData, setWealthData] = useState();
    //const postWealthData = {}

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    //NEED A POST REQUEST TO GET USER STOCKS!
    useEffect(() => {
        if(isAuthenticated) {
            const postStockData = {"name": user.name};
            fetchPost("/read_portfolio_history", postStockData).then(data => {
                setStockData(data);
            });
            const postHistoryData = {"name": user.name};
            fetchPost("/read_history", postHistoryData).then(data => {
                setWealthData(data['history']);
            });
        }
    }, []); // Empty dependency array ensures this runs once


    return (isAuthenticated && 
        ( <div>
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
                        {wealthData && <Graph data={wealthData} hoverInfo={true}/>}
                    </div>
                   
                </div>
            </div>
        </div>
        )
    );
}

export default Home;
