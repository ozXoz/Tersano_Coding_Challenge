import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProductsPage from './components/ProductPage'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="page-container">  {/* Use the common container style */}
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
