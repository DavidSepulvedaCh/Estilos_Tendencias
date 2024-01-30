'use strict';

const express = require('express');
const ProductController = require('../controllers/product');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas públicas (sin autenticación)
router.get('/getProducts', ProductController.getAllProducts);


// Rutas protegidas (requieren autenticación)
router.use(verificarToken);

router.post('/save-product', upload.single('imagen'), ProductController.saveProduct);
router.get('/products/:id?', ProductController.getProduct);
router.put('/update-product/:id', upload.single('imagen'), ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);


module.exports = router;
