
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.error(error));


  app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));