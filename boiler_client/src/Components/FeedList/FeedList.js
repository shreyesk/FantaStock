import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

const CustomList = ({ items }) => {
    console.log("")
  return (
    <List sx={{ width: '100%',  bgcolor: 'background.paper' , textAlign:'center'}}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            
            <ListItemText style={{width:'100%', textAlign:'center'}}
              primary={item}
              
            />
          </ListItem>
          {index < items.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default CustomList;
