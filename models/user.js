const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    city: String,
    country: String,
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
