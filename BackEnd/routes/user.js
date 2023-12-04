// user.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verificarToken } = require('../middlewares/auth');


// Ruta para el registro de usuarios
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(verificarToken);
router.get('/information', UserController.userInformation);

module.exports = router;
