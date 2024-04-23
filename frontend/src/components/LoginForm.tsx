import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/apiService'; 
import '../css/LoginForm.css'; 
import { ToastContainer, toast } from 'react-toastify'; //
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Use useState for managing email and password
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    try {
      const response = await login(email, password); // Call the login function imported from your service file
      if (response && response.token) {
        console.log(`User logged in successfully: ${email}`); // Log successful login
        navigate('/products'); // Navigate to products page on successful login
      } else {
        // alert('Login unsuccessful, please check your credentials.');
        toast.error('Login unsuccessful, please check your credentials.');
      }
    } catch (error: any) { // Using any here for simplicity, consider defining a more specific error type
      console.error('Login failed:', error);
      toast.error('Invalid email or password, please try again.');
      // alert('Failed to login: ' + error.message);
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div className="login-container">
      <div className="form">
        <h2>Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
        <button onClick={handleLogin}>Login</button>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick pauseOnHover draggable />
        <button onClick={handleGoBack}>Go Back</button> {/* Button to go back to the login page */}

      </div>
    </div>
  );
};

export default LoginForm;
