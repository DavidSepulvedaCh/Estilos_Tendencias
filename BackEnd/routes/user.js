const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const VerifyEmailController = require("../controllers/verifyEmail");
const { verificarToken } = require("../middlewares/auth");

// Ruta para el registro de usuarios
router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/users", UserController.getAllUsers);

// Ruta para verificar el correo electrónico
router.get("/verify-email/:token", VerifyEmailController.verifyEmail);

// Rutas para recuperar contraseña
router.put("/forgot-password", UserController.forgotPassword);
router.put("/new-password", UserController.newPassword);

router.use(verificarToken);
router.get("/information", UserController.userInformation);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
