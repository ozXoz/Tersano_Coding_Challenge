const jwt = require('jsonwebtoken');

// Function to generate JWT
const generateToken = user => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Middleware to authenticate and add user to the request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ error: 'Failed to authenticate token' });

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { generateToken, authenticateToken };
