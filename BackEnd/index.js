"use strict";

const mongoose = require("mongoose");
const app = require('./app');
require('dotenv').config();
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.a87koto.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conexion a la BD Atlas exitosa...");
        app.listen(port, () => {
            console.log("Server en puerto: " + port);
        });
    })
    .catch(err => console.log(err));
