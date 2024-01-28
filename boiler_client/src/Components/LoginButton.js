import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.css"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return(
    <div className="welcome-container">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#35C048" fill-opacity="1" d="M0,256L180,32L360,192L540,192L720,288L900,32L1080,192L1260,64L1440,64L1440,320L1260,320L1080,320L900,320L720,320L540,320L360,320L180,320L0,320Z"></path></svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#35C048" fill-opacity="1" d="M0,128L180,288L360,160L540,224L720,64L900,64L1080,192L1260,32L1440,224L1440,0L1260,0L1080,0L900,0L720,0L540,0L360,0L180,0L0,0Z"></path></svg>
      <div className="welcome-message">
        <h1>Welcome to FantaStock</h1>
        <p>Please login to access your personalized stock information.</p>
        {/* You can add a login button or link here */}
        <button onClick={() => loginWithRedirect()} className="login-button">Login</button>
      </div>
    </div>
    )
};

export default LoginButton;