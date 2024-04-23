const axios = require('axios');
const apiUrl = 'http://localhost:3001/api/arduino/data';
const loginUrl = 'http://localhost:3001/api/auth/login'; 

async function getAuthToken() {
    try {
        const response = await axios.post(loginUrl, {
            email: 'oz@oz.ca', // Use a registered user's email
            password: 'Azr2010q+' // Use the user's password
        });
        return response.data.token; // Adjust depending on how the token is returned in the response
    } catch (error) {
        console.error('Error obtaining token:', error);
        return null;
    }
}

async function simulateSensorData() {
    const token = await getAuthToken();
    if (!token) {
        console.log('No token available, cannot send data');
        return;
    }

    const data = {
        temperature: Math.random() * 100,
        humidity: Math.random() * 100
    };

    console.log("Sending simulated sensor data:", data);

    axios.post(apiUrl, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("Data sent successfully:", response.data);
    })
    .catch(error => {
        console.error("Failed to send data:", error);
    });
}

setInterval(simulateSensorData, 5000); // Send data every 5 seconds
