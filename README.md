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

   Oz Onur Korkmaz - Initial work - ozXoz


    Hat tip to anyone whose code was used
    Inspiration
    etc.


    Frontend for Product Management System

This React application serves as the frontend for managing products and handling user authentication. It interacts with a Node.js backend API to fetch, display, and update product data as well as manage user sessions.
Features

    User Authentication (Signup, Login, Logout)
    Product Display and Management (Add, Edit, Delete)
    Responsive UI with React Toast Notifications

Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.
Prerequisites

Before you begin, ensure you have the following installed:

    Node.js (Preferably the latest LTS version)
    npm (Node Package Manager)

Installing

    Clone the repository:

    bash

git clone https://github.com/ozXoz/Tersano_Coding_Challenge.git

Navigate to the project directory:

bash

cd yourfrontendproject

Install dependencies:

bash

    npm install

Running the Application

To start the development server:

bash

npm start

This command runs the app in the development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.
Building for Production

To build the app for production to the build folder:

bash

npm run build

This correctly bundles React in production mode and optimizes the build for the best performance.
Testing

Run the following command to launch the test runner:

bash

npm test

Available Scripts

In the project directory, you can run several commands:

    npm start: Runs the app in the development mode.
    npm test: Launches the test runner in the interactive watch mode.
    npm run build: Builds the app for production to the build folder.
    npm run eject: If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Deployment

To deploy on a live system, consider using services like Vercel, Netlify, or AWS Amplify which provide seamless integration with React applications.
Built With

    React - A JavaScript library for building user interfaces
    React Router - Collection of navigational components
    Axios - Promise based HTTP client for the browser and node.js
    React Toastify - Adding notifications to your app with ease


Live Demo

You can view the live application at https://frontend-phi-rust.vercel.app/.


