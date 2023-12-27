// user.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verificarToken } = require('../middlewares/auth');


// Ruta para el registro de usuarios
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rutas para recuperar contraseña
router.put('/forgot-pass', UserController.forgotPassword);


router.use(verificarToken);
router.put('/new-pass', UserController.newPassword);
router.post('/information', UserController.userInformation);

module.exports = router;
