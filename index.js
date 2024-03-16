const express = require('express');
const {createMongoDBConnection, createAuthMiddleware} = require('dynamic-auth');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

createMongoDBConnection(process.env.MONGODB_URI,PORT);

 // Middleware
 const app = express();
 app.use(express.json());

 // Import Mongoose model for user from another folder
 const User = require('./models/user');

 // Define fields for user data
 const userDataFields = ['firstname', 'lastname', 'email', 'address', 'city', 'country'];

 // Authentication routes
 app.use('/auth', createAuthMiddleware({ jwtSecret: process.env.JWT_SECRET, UserModel: User, userDataFields }));

