'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
            const user = await User.findById(userId).exec();

            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado.' });
            }

            return res.status(200).send({ user });
        } catch (err) {
            return res.status(500).send({ message: 'Error al obtener información del usuario.', error: err });
        }
    }
};


function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = controller;
