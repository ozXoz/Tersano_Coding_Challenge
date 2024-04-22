import axios from 'axios';

const API_URL = 'https://backend-kappa-five-70.vercel.app/api'; // Adjust the API URL as needed


// Login function

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      // Log the unexpected response structure
      console.error('Login response:', response.data);
      throw new Error('Authentication failed, no token provided');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle HTTP errors from axios and provide detailed error information
      console.error('Axios error:', error.response ? error.response.data : 'No response');
      throw new Error(error.response ? (error.response.data.error || 'Login failed with no specific error message') : 'Login failed due to network error');
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};








// Signup function
export const signup = async (firstName: string, lastName: string, email: string, password: string, rePassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { firstName, lastName, email, password, rePassword });
    localStorage.setItem('token', response.data.token); // Store the token in localStorage
  } catch (error) {
    throw error; // Throw error for handling in components
  }
};

// Logout function
export const logout = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
        }
      });
      localStorage.removeItem('token'); // Remove the token from localStorage
    } catch (error) {
      throw error; // Throw error for handling in components
    }
  };
  