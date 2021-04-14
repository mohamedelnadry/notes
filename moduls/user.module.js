const mongoose = require('mongoose');

const users = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('users', users);