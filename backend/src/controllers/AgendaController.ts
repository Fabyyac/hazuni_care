import { Request, Response } from 'express';
import Agenda from '../models/Agenda';

interface AuthRequest extends Request {
  usuario?: any;
}

export const listarAgenda = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const itens = await Agenda.findAll({ where: { usuario_id: usuario.id }, order: [['data', 'ASC'], ['hora', 'ASC']] });
    return res.status(200).json({ status: 'sucesso', dados: itens });
  } catch (erro) {
    console.error('Erro listando agenda:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao listar agenda' });
  }
};

export const criarEvento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { titulo, descricao, data, hora } = req.body;

    if (!titulo || !data || !hora) {
      return res.status(400).json({ status: 'erro', mensagem: 'Título, data e hora são obrigatórios' });
    }

    const evento = await Agenda.create({ titulo, descricao, data, hora, usuario_id: usuario.id });
    return res.status(201).json({ status: 'sucesso', dados: evento });
  } catch (erro) {
    console.error('Erro criando evento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao criar evento' });
  }
};

export const atualizarEvento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;
    const { titulo, descricao, data, hora, concluido } = req.body;

    const evento = await Agenda.findOne({ where: { id, usuario_id: usuario.id } });
    if (!evento) {
      return res.status(404).json({ status: 'erro', mensagem: 'Evento não encontrado' });
    }

    await evento.update({ titulo, descricao, data, hora, concluido });
    return res.status(200).json({ status: 'sucesso', dados: evento });
  } catch (erro) {
    console.error('Erro atualizando evento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao atualizar evento' });
  }
};

export const excluirEvento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;

    const evento = await Agenda.findOne({ where: { id, usuario_id: usuario.id } });
    if (!evento) {
      return res.status(404).json({ status: 'erro', mensagem: 'Evento não encontrado' });
    }

    await evento.destroy();
    return res.status(200).json({ status: 'sucesso', mensagem: 'Evento removido com sucesso' });
  } catch (erro) {
    console.error('Erro removendo evento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao remover evento' });
  }
};