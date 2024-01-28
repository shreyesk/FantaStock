import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import "./Leaderboard.css";
import { fetchPost } from '../../util/fetchHelp';
import Leaderboard from "./Leaderboard";

const LeaderboardGroup = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [groupsData, setGroupsData] = useState();

  useEffect(() => {
      if(isAuthenticated) {
        const postUserGroupsData = {'name': user.name}
        fetchPost('/read_user_groups', postUserGroupsData).then(data=> {
            setGroupsData(data['groups']);
            console.log(data);
        })
      }
  }, []); // Empty dependency array ensures this runs once

  // const playerData = [
  //   { name: 'Player 1', score: 100 },
  //   { name: 'Player 2', score: 85 },
  //   { name: 'Player 3', score: 70 },
  //   // ... add more player objects as needed
  // ];

  return (
    isAuthenticated && groupsData && (
        <>
        {groupsData.map((group, index) => (
            <Leaderboard group={group} index={index} />
        ))}
        </>
    )
  );
}

export default LeaderboardGroup;
