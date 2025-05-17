import { transporter } from '../config/nodemailer';

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Confirma tu cuenta',
      text: 'UpTask - Confirma tu cuenta',
      html: `<p>Hola: ${user.name} has creado tu cuenta en  UpTask 
        ya casi está todo listo, solo debes de confirmar tu cuenta
      </p>
      <p>Visita el siguiente enlace: </p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">
        Confirmar cuenta
      </a>
      <p>E ingresa el siguiente código: <b>${user.token}</b></p>
      <p>Este token expira en: 10 minutos</p>
      `,
    });
  };

  static sendPasswordResetToken = async (user: IEmail) => {
      await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Reestablecer contraseña',
      text: 'UpTask - Reestablece tu contraseña',
      html: `<p>Hola: ${user.name} has solicitado reestablecer tu contraseña</p>
      <p>Visita el siguiente enlace: </p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">
        Reestablecer contraseña
      </a>
      <p>E ingresa el siguiente código: <b>${user.token}</b></p>
      <p>Este token expira en: 10 minutos</p>
      `,
    });
  };
}
