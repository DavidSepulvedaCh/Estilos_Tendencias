'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const transporter = require('../config/mailer');
const EmailService = require('../services/sendEmail');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const controller = {
    register: async function (req, res) {
        const { name, lastName, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name: name,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            const userRegister = await user.save();
            const token = generateToken(userRegister._id);

            return res.status(200).send({ message: 'Usuario registrado exitosamente', tokenUsuario: token });
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).send({ message: 'Error al registrar el usuario.', err });
        }
    },

    login: async function (req, res) {
        console.log(req.body);
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send({ message: 'Credenciales inválidas' });
            }

            const token = generateToken(user._id);

            return res.status(200).send({ message: 'Login exitoso', tokenUsuario: token });
        } catch (err) {
            console.error('Error al intentar iniciar sesión:', err);
            return res.status(500).send({ message: 'Error al intentar iniciar sesión', error: err });
        }

    },

    userInformation: async function (req, res) {
        const userId = req.userId;

        try {
            const user = await User.findById(userId).select('-password').exec();

            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado.' });
            }

            return res.status(200).send({ user });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener información del usuario.', error: err });
        }
    },

    forgotPassword: async function (req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Ingrese un email." });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ message: 'El usuario no existe' });
            }

            const token = generateToken(user._id);
            user.resetPasswordToken = token;
            await user.save();

            let verificationLink = `enlaceFront`;
            const emailSent = await EmailService.sendPasswordResetEmail(email, verificationLink);

            if (emailSent) {
                return res.status(200).send({ message: 'Se ha enviado un enlace de restablecimiento a tu correo.', token });
            } else {
                throw new Error("Ocurrió un error al enviar el correo.");
            }

            return res.status(200).send({ message: 'Se ha enviado un enlace de restablecimiento a tu correo.' });
        } catch (error) {
            return res.status(500).send({ message: "Ocurrió un error al iniciar el proceso de restablecimiento de contraseña." });
        }
    },

    newPassword: async function (req, res) {
        const { newPassword } = req.body;
        const token = req.headers.authorization;
        if (!newPassword) {
            return res.status(400).send({ message: "Todos los campos son requeridos." });
        }

        try {
            const user = await User.findOne({ resetPasswordToken: token });
            if (!user) {
                return res.status(404).send({ message: 'El token es inválido o ha expirado.' });
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
            await user.save();

            return res.status(200).send({ message: 'Contraseña cambiada exitosamente.' });
        } catch (error) {
            return res.status(500).send({ message: "Ocurrió un error al cambiar la contraseña." });
        }
    }


};


function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = controller;
