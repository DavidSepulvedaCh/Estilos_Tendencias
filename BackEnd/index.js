"use strict";

const mongoose = require("mongoose");
const app = require('./app');
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://<_USER>:<_PASS>@cluster0.a87koto.mongodb.net/<_DBNAME>?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conexion a la BD Atlass exitosa...");
        app.listen(port, () => {
            console.log("Server in port: " + port);
        });
    })


    .catch(err => console.log(err));
