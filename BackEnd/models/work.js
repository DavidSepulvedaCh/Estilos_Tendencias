'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSchema = Schema({
    name: String,
    category: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Servicio', WorkSchema);
