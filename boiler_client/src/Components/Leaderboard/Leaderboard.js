import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export default function SelectedListItem({ playerData }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon>
              {/* You can use an icon here if needed */}
            </ListItemIcon>
            <ListItemText primary={`${player.name} - Score: ${player.score}`} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Box>
  );
}
