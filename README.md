Backend API for Sensor Data & User Management

This project is a Node.js backend application that handles user authentication, product management, and reception of sensor data from Arduino devices. It uses Express.js for the API framework, MongoDB for the database, and several other libraries for various functionalities like JWT for authentication and bcryptjs for password hashing.
Features

    User authentication (signup, login, logout)
    CRUD operations for products
    Reception and processing of sensor data from Arduino devices
    Device registration and authentication

Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites

What you need to install the software:

    Node.js (version 20.x)
    MongoDB
    npm (Node Package Manager)

Installing

A step-by-step guide to get your development environment running:

    Clone the repository to your local machine:

    bash

git clone https://github.com/ozXoz/Tersano_Coding_Challenge.git

Install the required npm packages:

    npm install

    Set up your environment variables:
        Rename .env.example to .env
        Adjust the DB_URI and JWT_SECRET in the .env file according to your local or cloud MongoDB setup and your preferred JWT secret.

Running the application

To start the server, run:

sql

npm start

For development, you can use nodemon to watch for changes:

nodemon server.js

Testing

To run the tests defined in the application:

bash

npm test

API Endpoints

The application provides several endpoints under the /api path:

    Auth routes: /api/auth
        POST /signup - Register a new user
        POST /login - Log in a user
        POST /logout - Log out a user

    Product routes: /api/products
        GET /getall - Retrieve all products
        POST /add - Add a new product
        PUT /:productId - Update an existing product
        DELETE /:productId - Delete a product

    Arduino routes: /api/arduino
        POST /data - Receive sensor data

Built With

    Express - The web framework used
    Mongoose - MongoDB object modeling tool
    jsonwebtoken - To generate JWTs for authentication
    bcryptjs - To hash passwords securely

Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.
Authors

    Your Name - Initial work - YourUsername

License

This project is licensed under the ISC License - see the LICENSE.md file for details.
Acknowledgments

    Hat tip to anyone whose code was used
    Inspiration
    etc.
