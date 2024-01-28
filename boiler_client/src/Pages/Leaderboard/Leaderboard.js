import React from 'react';
import SelectedListItem from "../../Components/Leaderboard/Leaderboard";
import "./Leaderboard.css";

const Leaderboard = () => {
  const isAuthenticated = true; // replace with your actual authentication check
  const playerData = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 85 },
    { name: 'Player 3', score: 70 },
    // ... add more player objects as needed
  ];

  return (
    isAuthenticated && playerData.length > 0 && (
      <div>
        <SelectedListItem playerData={playerData} />
      </div>
    )
  );
}

export default Leaderboard;
