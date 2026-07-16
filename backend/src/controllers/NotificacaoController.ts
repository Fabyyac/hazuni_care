import { Request, Response } from 'express';
import Notificacao from '../models/Notificacao';

interface AuthRequest extends Request {
  usuario?: any;
}

export const listarNotificacoes = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const itens = await Notificacao.findAll({ where: { usuario_id: usuario.id }, order: [['createdAt', 'DESC']] });
    return res.status(200).json({ status: 'sucesso', dados: itens });
  } catch (erro) {
    console.error('Erro listando notificações:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao listar notificações' });
  }
};

export const criarNotificacao = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { titulo, mensagem } = req.body;

    if (!titulo || !mensagem) {
      return res.status(400).json({ status: 'erro', mensagem: 'Título e mensagem são obrigatórios' });
    }

    const notificacao = await Notificacao.create({ titulo, mensagem, usuario_id: usuario.id });
    return res.status(201).json({ status: 'sucesso', dados: notificacao });
  } catch (erro) {
    console.error('Erro criando notificação:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao criar notificação' });
  }
};

export const marcarComoLida = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;

    const notificacao = await Notificacao.findOne({ where: { id, usuario_id: usuario.id } });
    if (!notificacao) {
      return res.status(404).json({ status: 'erro', mensagem: 'Notificação não encontrada' });
    }

    await notificacao.update({ lida: true });
    return res.status(200).json({ status: 'sucesso', dados: notificacao });
  } catch (erro) {
    console.error('Erro marcando notificação como lida:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao atualizar notificação' });
  }
};