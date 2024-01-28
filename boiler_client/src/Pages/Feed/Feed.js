import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import CustomList from "../../Components/FeedList/FeedList";
import { fetchPost } from '../../util/fetchHelp';
import "./Feed.css";

const Feed = () => {
  const { user, isAuthenticated } = useAuth0();
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPost('/get_feed', user).then(data => {
        setFeedData(data);
        console.log(data)
      });
    }
  }, [isAuthenticated, user]); // Include isAuthenticated and user in the dependency array

  return (
    isAuthenticated && feedData && (
      <div>
        <h2 style={{ 'width': '100%', 'textAlign': 'center' }}>Feed Data</h2>
        <CustomList items={feedData} />
      </div>
    )
  );
}

export default Feed;
