import { Auth0Provider } from '@auth0/auth0-react';
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavBar/NavBar";
import "./index.css";
import Landing from "./Pages/Landing/Landing";
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div>
      <Auth0Provider
        domain="dev-iqnere07mocxmssj.us.auth0.com"
        clientId="A576zvfyyiumfA1Nq8aeAB3tlH1k6NFO"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >

          <NavigationBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Landing />} />
            <Route path="/" element={<Landing />} />
            <Route path="/" element={<Landing />} />
            <Route path="/" element={<Landing />} />
          </Routes>

      </Auth0Provider>
    </div>
  );
};



// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
