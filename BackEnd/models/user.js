'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    name: String,
    lastName: String,
    role: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);