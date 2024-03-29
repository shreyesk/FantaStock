// InvestmentDetails.js

import React from 'react';

const InvestmentDetails = () => {
  // Sample investment data
  const investments = [
    { name: 'Stock A', amount: 5000 },
    { name: 'Stock B', amount: 3000 },
    { name: 'Stock C', amount: 2000 },
  ];

  return (
    <div className="investment-details-container">
      {/* <h2>Individual Investments</h2> */}
      { <ul>
        {investments.map((investment, index) => (
          <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">{investment.name}</div>
          <div className="notibody">{investment.amount}</div>
        </div>
          // <li key={index}>
          //   <span>{investment.name}:</span>
          //   <span>${investment.amount}</span>
          // </li>
        ))}
      </ul> }
    </div>
  );
}

export default InvestmentDetails;
