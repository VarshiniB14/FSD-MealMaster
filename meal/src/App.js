import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './pages/NavigationBar'; // Persistent navbar
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import MealCalendar from './pages/MealCalendar';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'; // Check login status

  return (
    <Router>
      <NavigationBar /> {/* Navbar persists across all pages */}
      <Routes>
        {/* Redirect root path (/) to Login if not logged in, otherwise go to Dashboard */}
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/mealcalendar" element={<MealCalendar />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}

export default App;
