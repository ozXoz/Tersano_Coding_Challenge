
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');  // Import product routes
const arduinoRoutes = require('./routes/arduinoRoutes');  // make sure the path is correct

mongoose.connect(process.env.DB_URI)

  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error(error));


  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);  // Use product routes with authentication
  app.use('/api/arduino', arduinoRoutes);


const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;