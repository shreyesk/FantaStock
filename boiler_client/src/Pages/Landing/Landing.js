import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from 'react';
import { fetchPost } from '../../util/fetchHelp.js';

import LoginButton from '../../Components/LoginButton.js';
import './Landing.css';
import Leaderboard from './Leaderboard.js';
import Main from "./Main";
import Home from "../Home/Home.js";

function Landing() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [currentForm, setCurrentForm]=useState("main")
  const [getData, setGetData] = useState()
  const [postData, setPostData] = useState()

  if(!isAuthenticated) {
    return <LoginButton />
  } else {
    console.log(user);
    const createUserData = {'name': user.name, 'sub': user.sub};
    fetchPost("/create_user", createUserData);
    return <Home />
  }

  // useEffect(() =>{
  //   fetchGet("/default_greet").then(data => {
  //     setGetData(data.message);
  //   });

  //   const postData = {'name': 'Jason'}
  //   fetchPost("/greet", postData).then(data => {
  //     setPostData(data.message);
  //   });

  // })

  return (
    <div className="App">
    {
      /*Sorry for this compact code if else wasnt working and knew no other way*/ 
      currentForm === "main" ? <Main onFormSwitch={setCurrentForm} />: 
      currentForm === "lead" ? <Leaderboard onFormSwitch={setCurrentForm} />: 
      // currentForm === "search" ? <SearchPage onFormSwitch={setCurrentForm} />: 

      // currentForm === "print" ? <Print onFormSwitch={setCurrentForm} plan={plan}/>:

      null //didnt need an else so i put null and it worked i guess
      // The names are declared when the buttons are pressed and formswitch is assign with a string. The strings are then matched here.
      // If the current form is login then stay at login, if its signup then move to sign up screen.
    }
      {/* {(typeof getData === "undefined") ? (
        <p>Loading...</p>
      ): (
        <>
          <p>Data received from our get request:</p>
          <p>{getData}</p>
        </>
      )}
      {(typeof postData === "undefined") ? (
        <p>Loading...</p>
      ): (
        <>
          <p>Data received from our post request:</p>
          <p>{postData}</p>
        </>
      )} */}
    </div>
  );
}

export default Landing;
