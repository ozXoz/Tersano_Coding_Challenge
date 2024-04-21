const express = require('express');
const User = require('../models/User');
const { generateToken,authenticateToken } = require('../middleware/jwt');  // Import JWT middleware
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log('Signup request:', firstName, lastName, email);  // Log input data
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = generateToken(user);  // Generate JWT when user signs up
    console.log('User created:', user._id);  // Log user ID
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Signup error:', error);  // Log errors
    res.status(400).send(error);
  }
});

// Login route
router.post('/login',authenticateToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);  // Log login attempt
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
        console.log('Login failed for:', email);  // Log failed login
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = generateToken(user);  // Generate JWT when user logs in
    console.log('User logged in:', user._id);  // Log user ID
    res.send({ user, token });
  } catch (error) {
    console.error('Login error:', error);  // Log errors
    res.status(500).send(error);
  }
});

// Logout
router.post('/logout', (req, res) => {
    console.log('Logout request from user ID:', req.userId);  // Log logout attempt
    // Since JWTs are stateless, logout is mostly a client-side action where the token is discarded.
    res.send({ message: "Logged out successfully" });
  });

module.exports = router;