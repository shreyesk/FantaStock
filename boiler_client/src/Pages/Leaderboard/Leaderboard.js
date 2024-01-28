import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import SelectedListItem from "../../Components/Leaderboard/Leaderboard";
import "./Leaderboard.css";
import { fetchPost } from '../../util/fetchHelp';

const Leaderboard = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [playerData, setPlayerData] = useState();

  useEffect(() => {
      if(isAuthenticated) {
        const group = props.group;
        const postLeaderboardData = {'group': group}
        fetchPost('/read_leaderboard', postLeaderboardData).then(data => {
          setPlayerData(data['leaderboard']);
        });
      }
  }, []); // Empty dependency array ensures this runs once

  // const playerData = [
  //   { name: 'Player 1', score: 100 },
  //   { name: 'Player 2', score: 85 },
  //   { name: 'Player 3', score: 70 },
  //   // ... add more player objects as needed
  // ];

  return (
    isAuthenticated && playerData && (
      <div>
        <h2 style={{'width': '100%', 'textAlign': 'center'}}>{props.group}</h2>
        <SelectedListItem playerData={playerData} />
      </div>
    )
  );
}

export default Leaderboard;
