"use strict";

const mongoose = require("mongoose");
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.set('port', port);

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.a87koto.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conexión a la BD Atlas exitosa...");
        app.listen(port, () => {
            console.log("Servidor en puerto: " + port);
        });
    })
    .catch(err => console.log(err));
