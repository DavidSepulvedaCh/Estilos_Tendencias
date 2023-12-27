const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    }
});

transporter.verify().then(() => {
    console.log("Servicio de correo listo!");
});

module.exports = transporter;
