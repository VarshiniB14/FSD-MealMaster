import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-tabs" role="menubar">
        <li className="nav-item" role="menuitem">
          <Link to="/" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item" role="menuitem">
          <Link to="/recipe" className="nav-link">Recipe</Link>
        </li>
        <li className="nav-item" role="menuitem">
          <Link to="/mealcalendar" className="nav-link">Meal Calendar</Link>
        </li>
        <li className="nav-item" role="menuitem">
          <Link to="/shoppingcart" className="nav-link">Shopping Cart</Link>
        </li>
        <li className="nav-item" role="menuitem">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
