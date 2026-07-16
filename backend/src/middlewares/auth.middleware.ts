import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'hazuni_secret_2026';

interface AuthRequest extends Request {
  usuario?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ status: 'erro', mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decodificado = jwt.verify(token, JWT_SECRET) as any;

    const usuario = await User.findByPk(decodificado.id);
    if (!usuario || !usuario.status) {
      return res.status(401).json({ status: 'erro', mensagem: 'Usuário inválido ou inativo' });
    }

    req.usuario = usuario;
    next();
  } catch (erro) {
    return res.status(401).json({ status: 'erro', mensagem: 'Token inválido ou expirado' });
  }
};