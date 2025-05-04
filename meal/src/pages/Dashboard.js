import React from 'react';
import './Dashboard.css';
import img1 from './dash4.jpg'; // Update the path if necessary

const Dashboard = () => {
  return (
    <div className="dashboard" style={{ backgroundImage: `url(${img1})` }}>
      <div className="brand-section">
        <h1 className="brand-title">MealMaster</h1>
        <p className="brand-tagline">From Recipe to Shopping Cart, We’ve Got You Covered!</p>
      </div>
    </div>
  );
};

export default Dashboard;
