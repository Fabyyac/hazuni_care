import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (erro: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro no servidor:', erro);
  return res.status(erro.statusCode || 500).json({
    status: 'erro',
    mensagem: erro.message || 'Erro interno no servidor',
    timestamp: new Date().toISOString()
  });
};