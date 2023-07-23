'use strict';

const express = require('express');
const ProductController = require('../controllers/product');
const { route } = require('express/lib/application');

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './uploads' });
const multipart = require('connect-multiparty');
const multiparMidelware = multipart({ uploadDir: './uploads' });

router.get('/', ProductController.home);
router.get('/test', ProductController.test);
router.post('/save-product', ProductController.saveProduct);
router.get('/products/:id?', ProductController.getProduct);
router.get('/getProducts', ProductController.getAllProducts);
router.put('/update-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);
router.post('/upload-img/:id', upload.single('image'), ProductController.uploadImage);

module.exports = router;