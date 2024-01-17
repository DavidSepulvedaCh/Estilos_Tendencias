'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = require('./product');

const ShoppingCarSchema = Schema({
    email: String,
    quantity: Number,
    total: Number,
    products: []
});

const ShoppingCar = mongoose.model('ShoppingCar', ShoppingCarSchema);

module.exports = ShoppingCar;
