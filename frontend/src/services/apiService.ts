import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Adjust the API URL as needed

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data; // Return response data on success
  } catch (error: any) { // Specify error type as 'any'
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      return { error: error.response.data.error }; // Return error message from server
    } else if (error.request) {
      // The request was made but no response was received
      return { error: 'No response from server' };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { error: 'An error occurred' };
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
  