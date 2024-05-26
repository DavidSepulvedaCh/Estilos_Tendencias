const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


// Archivos de rutas
const product_routes = require('./routes/product');
const user_routes = require('./routes/user');
const shopping_routes = require('./routes/shopping');
const works_routes = require('./routes/work');
const supplier_routes = require('./routes/supplier');
const post_routes = require('./routes/post');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); //combined --> todo mas a detalle sobre las peticiones al server

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
}));



// Rutas
app.use('/api/product', product_routes);
app.use('/api/user', user_routes);
app.use('/api/shopping', shopping_routes);
app.use('/api/work', works_routes);
app.use('/api/supplier', supplier_routes);
app.use('/api/post/', post_routes)
/* app.use('/api/payment', payment_routes); */

module.exports = app;
