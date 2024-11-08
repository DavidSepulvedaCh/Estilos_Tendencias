const fs = require("fs");
const path = require("path");
const transporter = require("../config/mailer");

const emailStyles = fs.readFileSync(
  path.join(__dirname, "../assets/emailStyles.css"),
  "utf8"
);

const EmailService = {
  sendPasswordResetEmail: async function (email, verificationLink) {
    try {
      await transporter.sendMail({
        from: "Estilos.tendencias@example.com",
        to: email,
        subject: "Restaurar Contraseña - Estilos & Tendencias",
        text: "Restablece tu contraseña en Estilos & Tendencias",
        html: `
          <html>
            <head>
              <style>${emailStyles}</style>
            </head>
            <body>
              <div class="container">
                  <div class="header">
                      <h1>Estilos & Tendencias</h1>
                  </div>
                  <p>Hola,</p>
                  <p>Has solicitado restablecer tu contraseña en <b>Estilos & Tendencias.</b> Haz clic en el siguiente enlace para
                      cambiar tu contraseña:</p>
                  <a href="${verificationLink}">Restablecer Contraseña</a>
                  <p>Si no solicitaste esto, puedes ignorar este correo y tu contraseña permanecerá sin cambios.</p>
                  <p>Atentamente,<br /><b>El equipo de Estilos & Tendencias</b></p>

                  <div class="social-icons">
                      <a href="https://www.instagram.com/" target="_blank">
                          <img src="./assets/instagram.svg" alt="Instagram">
                      </a>
                      <a href="https://www.facebook.com/" target="_blank">
                          <img src="./assets/facebook.svg" alt="Facebook">
                      </a>
                      <a href="https://x.com/" target="_blank">
                          <img src="./assets/x.svg" alt="Twitter">
                      </a>
                  </div>

                  <div class="footer">
                      <p>© 2024 Estilos & Tendencias. Todos los derechos reservados.</p>
                  </div>
              </div>
            </body>
          </html>
        `,
      });

      return true;
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return false;
    }
  },

  sedEmailVerifyRegister: async function (email, verificationLink) {
    try {
      await transporter.sendMail({
        from: "Estilos.tendencias@example.com",
        to: email,
        subject: "Verificar Cuenta - Estilos & Tendencias",
        text: "Verifica tu cuenta en Estilos & Tendencias",
        html: `
          <html>
            <head>
              <style>${emailStyles}</style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                    <h1>Estilos & Tendencias</h1>
                </div>
                <p>Hola,</p>
                <p>Gracias por registrarte en <b>Estilos & Tendencias.</b> Tu correo electrónico fue verificado exitosamente.</p>
                <a href="${verificationLink}">Verificar Cuenta</a>
                <p>Si no solicitaste esto, puedes ignorar este correo y tu cuenta no se verá afectada.</p>
                <p>Atentamente,<br /><b>El equipo de Estilos & Tendencias</b></p>

                <div class="social-icons">
                    <a href="https://www.instagram.com/" target="_blank">
                        <img src="https://res.cloudinary.com/dwfh4s7tu/image/upload/v1731030735/gb3pzqyiledbgoligqop.svg" alt="Instagram">
                    </a>
                    <a href="https://www.facebook.com/" target="_blank">
                        <img src="https://res.cloudinary.com/dwfh4s7tu/image/upload/v1731030735/iecwquev3f7m6zdidxrw.svg" alt="Facebook">
                    </a>
                    <a href="https://x.com/" target="_blank">
                        <img src="https://res.cloudinary.com/dwfh4s7tu/image/upload/v1731030736/laud1g6pxowvcwrfqyw3.svg" alt="Twitter">
                    </a>
                </div>

                <div class="footer">
                    <p>© 2024 Estilos & Tendencias. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </html>
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
