
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/jwt');  // Import JWT middleware for authentication

// Route to receive sensor data
router.post('/data', authenticateToken, async (req, res) => {
    const { temperature, humidity } = req.body;

    console.log("Received sensor data:", req.body);

    // For simulation, just sending back the received data
    res.status(201).json({
        message: "Sensor data received successfully",
        data: req.body
    });
});

module.exports = router;
