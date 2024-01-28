// StockGraph.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const StockGraph = () => {
  // Sample data for the graph
  const graphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Net Profit',
        data: [1000, 1200, 800, 1500, 1100, 2000],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'green',
      },
    ],
  };

  return (
    <div className="stock-graph-container">
      <h2>Net Profit Graph</h2>
      <Line data={graphData} />
    </div>
  );
}

export default StockGraph;
