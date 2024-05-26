'use strict'
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const SuppliersSchema = Schema({
    name: String,
    category: String,
    image: String,
    imageExtension: String
});

module.exports = mongoose.model('Proovedor', SuppliersSchema);
