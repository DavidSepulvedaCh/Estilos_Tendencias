'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = Schema({
    name: String,
    description: String,
    category: String,
    image: String,
    imageExtension: String,
    stock: Number,
    price: Number
});

module.exports = mongoose.model('Producto', ProductSchema);