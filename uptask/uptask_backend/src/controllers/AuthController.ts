import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword } from '../utils/auth';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      // Prevenir duplicados
      const userExists = await User.findOne({ email });
      if (userExists) {
        res
          .status(409)
          .json({ msg: `El usuario con correo ${email} ya existe` });
        return;
      }

      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();

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
}
