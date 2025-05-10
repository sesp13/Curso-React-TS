import { Request, Response } from 'express';
import User from '../models/user';
import { checkPassword, hashPassword } from '../utils/auth';
import Token from '../models/token';
import { generateToken } from '../utils/token';
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
        res.status(401).json({ msg: error.message });
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

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error('Usuario no encontrado');
        res.status(401).json({ error: error.message });
        return;
      }

      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();

        await AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });

        const error = new Error(
          'Usuario no confirmado, hemos enviado un email de confirmación'
        );
        res.status(401).json({ error: error.message });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error('Login incorrecto');
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(200).json({ msg: 'Login' });
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
