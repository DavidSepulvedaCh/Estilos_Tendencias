const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
require("dotenv").config();

var controller = {
  verifyEmail: async function (req, res) {
    const token = req.params.token;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(400).send({ message: "Usuario no encontrado." });
      }

      user.isVerified = true;
      await user.save();

      return res.redirect(process.env.URL_EMAIL_SUCCESS);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Error al verificar el correo electrónico.", err });
    }
  },
};

module.exports = controller;
