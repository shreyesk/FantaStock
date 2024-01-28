import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Graph from '../../Components/Graph/Graph';
import { fetchPost } from '../../util/fetchHelp';

export default function SelectedListItem({ playerData }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [stockData, setStockData] = React.useState(null);

  const handleListItemClick = (event, index, player) => {
    setSelectedIndex(index);
    console.log(player.name)
    fetchPost('/read_portfolio_history', {'name': player.name}).then(data => {
      setStockData(data)
    });
  };

  return (
    <Box
      sx={{
        width: '60%',
        margin: '0 auto',
        bgcolor: 'background.paper',
      }}
    >
      <List component="nav" aria-label="player list">
        {playerData.map((player, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index, player)}
          >
            <ListItemIcon>
              {/* You can use an icon here if needed */}
            </ListItemIcon>
            <ListItemText primary={`${player.name} - Score: ${(player.score).toFixed(2)}`} />
          </ListItemButton>
        ))}
      </List>
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
      <Divider />
    </Box>
  );
}
