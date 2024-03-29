import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const buttons = { Landing: "/landing", Home: "/home", Stocks: "/stocks", Groups: "/groups", Connections: "/connections", Feed: "/feed", Leaderboard: "/leaderboard"};

  const [value, setValue] = useState(0);

  const handleButtonClick = (index) => {
    setValue(index);
    navigate(Object.values(buttons)[index]);
  };

  return (
    <div className="buttonContainer">
      <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} centered>
        {Object.keys(buttons).map((button, index) => (
          <Tab
            key={index}
            label={button}
            onClick={() => handleButtonClick(index)}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default NavigationBar;
