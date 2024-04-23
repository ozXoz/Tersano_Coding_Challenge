const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let timerId = null;
let endTime = null;

// Start or restart the timer with a specified duration in milliseconds
app.post('/timer/start', (req, res) => {
    const { duration } = req.body; // Duration in milliseconds

    // Clear existing timer if any
    if (timerId) clearTimeout(timerId);

    // Set a new timer
    endTime = Date.now() + duration;
    timerId = setTimeout(() => {
        console.log("Timer done!");
        // Additional code to execute when timer expires
    }, duration);

    res.send("Timer started");
});

// Stop the timer
app.post('/timer/stop', (req, res) => {
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
app.post('/timer/reset', (req, res) => {
    if (timerId) {
        const remainingTime = endTime - Date.now();
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            console.log("Timer done!");
            // Additional code to execute when timer expires
        }, remainingTime);

        res.send("Timer reset with the remaining time");
    } else {
        res.send("No active timer to reset");
    }
});

// Adjust timer's duration
app.post('/timer/adjust', (req, res) => {
    const { newDuration } = req.body; // New duration in milliseconds

    if (timerId && newDuration) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            console.log("Timer done!");
            // Additional code to execute when timer expires
        }, newDuration);

        res.send("Timer duration adjusted");
    } else {
        res.send("No active timer to adjust or no new duration provided");
    }
});

app.listen(port, () => {
    console.log(`Timer app listening at http://localhost:${port}`);
});
