import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from 'react';
import { fetchPost } from '../../util/fetchHelp';
import SelectedListItem from "../../Components/Leaderboard/Leaderboard";
import "./Connections.css";
const Connections = () => {
 const { user, isAuthenticated, isLoading } = useAuth0();
 const [playerData, setPlayerData] = useState();
  // const playerData = [
  //   { name: 'Player 1', score: 100 },
  //   { name: 'Player 2', score: 85 },
  //   { name: 'Player 3', score: 70 },
  //   // ... add more player objects as needed
  // ];

  useEffect(() => {
      if(isAuthenticated) {
        const postConnectionsData = {'name': user.name}
        fetchPost('/read_connections', postConnectionsData).then(data => {
          setPlayerData(data['connections']);
        });
      }
  }, []); // Empty dependency array ensures this runs once

  return (
    
    isAuthenticated && playerData && (
      <div>
        <h2 style={{'width': '100%', 'textAlign': 'center'}}>Connections</h2>
        <SelectedListItem playerData={playerData} />
      </div>
    )
  );
}

export default Connections;
