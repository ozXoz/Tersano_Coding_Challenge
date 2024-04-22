import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/apiService'; // Adjust the import path as necessary
import '../css/SignupForm.css'; // Make sure the path is correct
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignupForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSignup = async () => {
    if (password !== rePassword) {
      // alert('Passwords do not match!');
      toast.error('Passwords do not match!');
      return;
    }
    try {
      await signup(firstName, lastName, email, password, rePassword);
      toast.success('Signup successful!');
      // navigate('/login'); // Use navigate to redirect to login page on successful signup
    } catch (error: any) { // Specify error type as any
      console.error('Signup failed:', error);
      // alert('Failed to signup: ' + error.response?.data?.error); // Use optional chaining to access response data
      toast.error(`Signup failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="form">
        <h2>Signup</h2>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} placeholder="Repeat Password" />
        <button onClick={handleSignup}>Signup</button>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default SignupForm;
