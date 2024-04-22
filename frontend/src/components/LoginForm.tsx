import React, { useState } from 'react'; // Import useState from react
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { login } from '../services/apiService'; // Adjust the import path as necessary to where login is defined

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Use useState for managing email and password
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    try {
      const response = await login(email, password); // Call the login function imported from your service file
      if (response && response.token) {
        navigate('/products'); // Navigate to products page on successful login
      } else {
        alert('Login unsuccessful, please check your credentials.');
      }
    } catch (error: any) { // Using any here for simplicity, consider defining a more specific error type
      console.error('Login failed:', error);
      alert('Failed to login: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
