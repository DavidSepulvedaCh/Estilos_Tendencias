'use strict';

const express = require('express');
const PostController = require('../controllers/post');
const { verificarToken } = require('../middlewares/auth');

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas públicas (sin autenticación)
router.get('/get-posts', PostController.getAllPosts);

// Rutas protegidas (requieren autenticación)
router.use(verificarToken);
router.post('/save-post', upload.single('imagen'), PostController.savePost);
router.delete('/delete-post/:id', PostController.deletePost);


module.exports = router;