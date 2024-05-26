'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = Schema({
    name: String,
    description: String,
    image: String,
    imageExtension: String,
});

module.exports = mongoose.model('Post', PostSchema);