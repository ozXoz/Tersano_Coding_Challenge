// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const jwt = require('jsonwebtoken'); 

// Device registration
router.post('/register', async (req, res) => {
    const { deviceId, model, owner, secret } = req.body;
    try {
        let device = await Device.findOne({ deviceId });
        if (device) {
            return res.status(409).send({ message: 'Device already registered' });
        }
        device = new Device({ deviceId, model, owner, secret });
        await device.save();
        res.status(201).send({ message: 'Device registered successfully', device: device });
    } catch (error) {
        console.error('Error registering device:', error);
        res.status(500).send({ message: 'Error registering device' });
    }
});

// Device login
router.post('/device-login', async (req, res) => {
    const { deviceId, secret } = req.body;
    try {
        const device = await Device.findOne({ deviceId });
        if (!device || device.secret !== secret) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ deviceId: device.deviceId }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Login error' });
    }
});

module.exports = router;
