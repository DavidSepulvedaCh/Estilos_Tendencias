'use strict';

const express = require('express');
const SupplierController = require('../controllers/supplier');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas públicas (sin autenticación)
router.get('/get-suppliers', SupplierController.getAllSuppliers);

// Rutas protegidas (requieren autenticación)
router.use(verificarToken);
router.post('/save-supplier', upload.single('imagen'), SupplierController.saveSupplier);
router.delete('/delete-supplier/:id', SupplierController.deleteSupplier);


module.exports = router;