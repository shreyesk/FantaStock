import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from 'react';
import { fetchPost } from '../../util/fetchHelp';
import "./Group.css";
import { Button } from "@mui/material";

const Group = () => {
 const { user, isAuthenticated, isLoading } = useAuth0();
 const [groups, setGroups] = useState();
 const [userGroups, setUserGroups] = useState();

 const loadData = () => {
        fetchPost('/read_groups', {}).then(data => {
            setGroups(data['groups'])
        });
        fetchPost('/read_user_groups', {'name': user.name}).then(data => {
            setUserGroups(data['groups']);
            console.log(data);
        });
 }

  useEffect(() => {
      if(isAuthenticated) {
        loadData();
      }
  }, []); // Empty dependency array ensures this runs once

  function joinGroup(groupName, userName) {
    fetchPost('/join_group', {'group_name': groupName, 'user_name': userName}).then(data => {
        loadData();
    });
  }

  function leaveGroup(groupName, userName) {
    fetchPost('/leave_group', {'group_name': groupName, 'user_name': userName}).then(data => {
        loadData();
    });
  }

  return (
    
    isAuthenticated && groups && userGroups && (
      <div style={{'display': 'flex', 'flexDirection': 'column', 'width': '100%', 'justifyContent': 'center'}}>
        {groups.map((name, index) => {
            if(userGroups.includes(name)) {
                return (<>
                    <h2 style={{'marginTop': '3%', 'width': '100%', 'textAlign': 'center'}} key={index}>{name}</h2>
                    <Button onClick={() => {leaveGroup(name, user.name)}}>Leave</Button>
                </>)
            } else {
                return (<>
                    <h2 style={{'marginTop': '3%', 'width': '100%', 'textAlign': 'center'}} key={index}>{name}</h2>
                    <Button onClick={() => {joinGroup(name, user.name)}}>Join</Button>
                </>)
            }
        })}
      </div>
    )
  );
}

export default Group;
