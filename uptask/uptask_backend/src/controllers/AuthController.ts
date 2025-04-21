import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword } from '../utils/auth';
import Token from '../models/token';
import { generateToken } from '../utils/token';
import { transporter } from '../config/nodemailer';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      // Prevent duplicates
      const userExists = await User.findOne({ email });
      if (userExists) {
        res
          .status(409)
          .json({ msg: `El usuario con correo ${email} ya existe` });
        return;
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);

      // Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      // Send Email
      await AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);

      res.json({ msg: 'Cuenta creada, revisa tu email para confirmarla' });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error inesperado contacte al administrador',
      });
      return;
    }
  };
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error('Token no válido!');
        res.status(401).json({ error: error.message });
        return;
      }

      const user = await User.findById(tokenExists.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.json({ msg: 'Cuenta confirmada correctamente!' });

      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error inesperado contacte al administrador',
      });
      return;
    }
  };
}
