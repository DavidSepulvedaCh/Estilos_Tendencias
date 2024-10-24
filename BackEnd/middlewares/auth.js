const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .send({ message: "Acceso denegado. Token no proporcionado." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Token inválido." });
    }
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
}

module.exports = { verificarToken };
