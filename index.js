
const express = require('express');
const createAuthMiddleware = require('dynamic-auth');
const createMongoDBConnection = require('dynamic-auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

if (createMongoDBConnection(process.env.MONGODB_URI)) {
    // Middleware
    app.use(express.json());

    // Import Mongoose model for user from another folder
    const User = require('./models/user');

    // Define fields for user data
    const userDataFields = ['firstname', 'lastname', 'email', 'address', 'city', 'country'];

    // Authentication routes
    app.use('/auth', createAuthMiddleware({ jwtSecret: process.env.JWT_SECRET, UserModel: User, userDataFields }));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log('Database connected successfully');
    
  } else {
    console.log('Failed to connect to the database');
  }
