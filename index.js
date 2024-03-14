
const express = require('express');
const mongoose = require('mongoose');
const createAuthMiddleware = require('dynamic-auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

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
