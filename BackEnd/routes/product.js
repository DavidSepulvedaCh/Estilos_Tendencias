'use strict';

const express = require('express');
const ProductController = require('../controllers/product');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './uploads' });
const multipart = require('connect-multiparty');
const multiparMidelware = multipart({ uploadDir: './uploads' });

// Rutas públicas (sin autenticación)
router.get('/', ProductController.home);
router.get('/test', ProductController.test);
router.get('/getProducts', ProductController.getAllProducts);


// Rutas protegidas (requieren autenticación)
router.use(verificarToken);

router.post('/save-product', ProductController.saveProduct);
router.get('/products/:id?', ProductController.getProduct);
router.put('/update-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);


module.exports = router;
