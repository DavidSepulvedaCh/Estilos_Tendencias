const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors'); // Importar cors


// Archivos de rutas
const product_routes = require('./routes/product');
const user_routes = require('./routes/user');
const shopping_routes = require('./routes/shopping');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); //combined --> todo mas a detalle sobre las peticiones al server

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Rutas
app.use('/api/product', product_routes);
app.use('/api/user', user_routes);
app.use('/api/shopping', shopping_routes);

module.exports = app;
