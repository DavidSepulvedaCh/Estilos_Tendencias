const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
});


transporter.verify().then(() => {
    console.log("Servicio de correo listo!");
}).catch(err => {
    console.error("Error al iniciar el servicio de correo:", err);
});

module.exports = transporter;
