const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

// Archivos de rutas
const product_routes = require('./routes/product');
const user_routes = require('./routes/user'); // Importa las rutas de usuario

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); //combined --> todo mas a detalle sobre las peticiones al server

// Configuración de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use('/api/product', product_routes);
app.use('/api/user', user_routes);

module.exports = app;
