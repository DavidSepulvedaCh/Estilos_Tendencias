const transporter = require('../config/mailer');

const EmailService = {
    sendPasswordResetEmail: async function (email, verificationLink) {
        try {
            await transporter.sendMail({
                from: '"Estilos & Tendencias" <tu_correo@gmail.com>',
                to: 'luxuaauto@gmail.com',
                subject: "Restaurar Contraseña - Estilos & Tendencias",
                text: "Restablece tu contraseña en Estilos & Tendencias",
                html: `
          <p>Hola,</p>
          <p>Has solicitado restablecer tu contraseña en Estilos & Tendencias. Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
          <p><a href="${verificationLink}">Restablecer Contraseña</a></p>
          <p>Si no solicitaste esto, puedes ignorar este correo y tu contraseña permanecerá sin cambios.</p>
          <p>Atentamente,<br/>El equipo de Estilos & Tendencias</p>
        `,
            });

            return true;
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            return false;
        }
    },
};

module.exports = EmailService;
