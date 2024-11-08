"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const transporter = require("../config/mailer");
const EmailService = require("../services/sendEmail");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const controller = {
  register: async function (req, res) {
    const { name, lastName, email, role, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: role,
        isVerified: false,
      });

      const userRegister = await user.save();
      const token = generateToken(userRegister._id, userRegister.email);

      const verificationLink = `${process.env.URL_VERIFICATION_EMAIL}/${token}`;

      const emailSent = await EmailService.sedEmailVerifyRegister(
        email,
        verificationLink
      );

      if (!emailSent) {
        return res
          .status(500)
          .send({ message: "Error al enviar el correo de verificación." });
      }

      return res.status(200).send({
        message:
          "Usuario registrado exitosamente. Por favor, verifica tu correo electrónico.",
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Error al registrar el usuario.", err });
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).send({ message: "Usuario no encontrado." });
      }

      if (!user.isVerified) {
        return res.status(400).send({
          message:
            "Por favor, verifica tu correo electrónico antes de iniciar sesión.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ message: "Contraseña incorrecta." });
      }

      const token = generateToken(user._id, user.email);

      return res.status(200).send({ tokenUsuario: token });
    } catch (err) {
      return res.status(500).send({ message: "Error al iniciar sesión.", err });
    }
  },

  userInformation: async function (req, res) {
    const userId = req.userId;

    try {
      const user = await User.findById(userId).select("-password").exec();

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      return res.status(200).send({ user });
    } catch (err) {
      return res.status(500).send({
        message: "Error al obtener información del usuario.",
        error: err,
      });
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
        return res.status(404).send({ message: "El usuario no existe" });
      }

      const token = generateToken(user._id, user.email);
      user.resetPasswordToken = token;
      await user.save();

      let verificationLink = `${process.env.URL_PASSWORD_RESET}?token=${token}`;
      const emailSent = await EmailService.sendPasswordResetEmail(
        email,
        verificationLink
      );

      if (emailSent) {
        return res.status(200).send({
          message: "Se ha enviado un enlace de restablecimiento a tu correo.",
          token,
        });
      } else {
        throw new Error("Ocurrió un error al enviar el correo.");
      }
    } catch (error) {
      return res.status(500).send({
        message:
          "Ocurrió un error al iniciar el proceso de restablecimiento de contraseña.",
      });
    }
  },

  newPassword: async function (req, res) {
    const { newPassword } = req.body;
    const token = req.headers.authorization;
    if (!newPassword) {
      return res
        .status(400)
        .send({ message: "Todos los campos son requeridos." });
    }

    try {
      const user = await User.findOne({ resetPasswordToken: token });
      if (!user) {
        return res
          .status(404)
          .send({ message: "El token es inválido o ha expirado." });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      user.resetPasswordToken = null;
      await user.save();

      return res
        .status(200)
        .send({ message: "Contraseña cambiada exitosamente." });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Ocurrió un error al cambiar la contraseña." });
    }
  },

  getAllUsers: async function (req, res) {
    try {
      const users = await User.find().select("-password").exec();
      return res.status(200).send({ users });
    } catch (error) {
      return res.status(500).send({
        message: "Ocurrió un error al obtener los usuarios.",
        error: error.message,
      });
    }
  },

  deleteUser: async function (req, res) {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }
      return res
        .status(200)
        .send({ success: true, message: "Usuario eliminado exitosamente." });
    } catch (error) {
      return res.status(500).send({
        message: "Ocurrió un error al eliminar el usuario.",
        error: error.message,
      });
    }
  },
};

function generateToken(userId, email) {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = controller;
