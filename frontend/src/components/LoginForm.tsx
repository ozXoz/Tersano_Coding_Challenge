import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/apiService'; // Adjust the import path as necessary

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/products'); // Redirect to products page on successful login
    } catch (error: any) { // Specify error type as any
      console.error('Login failed:', error);
      alert('Failed to login: ' + error.response?.data?.error); // Use optional chaining to access response data
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
