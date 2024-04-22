import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';  // Ensure the CSS path is correct

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Product Management System</h1>
      <div className="links">
        <Link to="/login" className="link">Login</Link>
        <span> | </span>
        <Link to="/signup" className="link">Signup</Link>
      </div>
    </div>
  );
};

export default HomePage;
