const express = require('express');
const router = express.Router();

let timerId = null;
let endTime = null;

router.use(express.json()); // Ensure JSON parsing for these routes

// Start or restart the timer with a specified duration in milliseconds
// Start or restart the timer with a specified duration in milliseconds
router.post('/start', (req, res) => {
    const { duration } = req.body;
    if (timerId) {
        console.log("Clearing existing timer:", timerId);
        clearTimeout(timerId);
    }
    endTime = Date.now() + duration;
    timerId = setTimeout(() => {
        console.log("Timer done!");
        timerId = null; // Reset timerId when done
    }, duration);
    console.log("Timer started with ID:", timerId);
    res.send("Timer started");
});

// Stop the timer
router.post('/stop', (req, res) => {
    console.log("Stopping timer with ID:", timerId);
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
        endTime = null;
        res.send("Timer stopped");
    } else {
        res.send("No active timer to stop");
    }
});

// Reset the timer
router.post('/reset', (req, res) => {
    console.log("Resetting timer with ID:", timerId);
    if (timerId) {
        const remainingTime = endTime - Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            console.log("Timer done!");
            timerId = null; // Reset timerId when done
        }, remainingTime);
        res.send("Timer reset with the remaining time");
    } else {
        res.send("No active timer to reset");
    }
});

// Adjust timer's duration
router.post('/adjust', (req, res) => {
    const { newDuration } = req.body;
    console.log("Adjusting timer with ID:", timerId, "to new duration:", newDuration);
    if (timerId && newDuration) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            console.log("Timer done!");
            timerId = null; // Reset timerId when done
        }, newDuration);
        res.send("Timer duration adjusted");
    } else {
        res.send("No active timer to adjust or no new duration provided");
    }
});


module.exports = router;
