import { Request, Response } from 'express';
import Medicamento from '../models/Medicamento';

interface AuthRequest extends Request {
  usuario?: any;
}

export const listarMedicamentos = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const itens = await Medicamento.findAll({ where: { usuario_id: usuario.id }, order: [['nome', 'ASC']] });
    return res.status(200).json({ status: 'sucesso', dados: itens });
  } catch (erro) {
    console.error('Erro listando medicamentos:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao listar medicamentos' });
  }
};

export const criarMedicamento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { nome, dosagem, frequencia, horario, vencimento } = req.body;

    if (!nome || !dosagem || !frequencia || !horario || !vencimento) {
      return res.status(400).json({ status: 'erro', mensagem: 'Todos os campos são obrigatórios' });
    }

    const medicamento = await Medicamento.create({
      nome,
      dosagem,
      frequencia,
      horario,
      vencimento,
      usuario_id: usuario.id
    });

    return res.status(201).json({ status: 'sucesso', dados: medicamento });
  } catch (erro) {
    console.error('Erro criando medicamento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao criar medicamento' });
  }
};

export const atualizarMedicamento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;
    const { nome, dosagem, frequencia, horario, vencimento, ativo } = req.body;

    const medicamento = await Medicamento.findOne({ where: { id, usuario_id: usuario.id } });
    if (!medicamento) {
      return res.status(404).json({ status: 'erro', mensagem: 'Medicamento não encontrado' });
    }

    await medicamento.update({ nome, dosagem, frequencia, horario, vencimento, ativo });
    return res.status(200).json({ status: 'sucesso', dados: medicamento });
  } catch (erro) {
    console.error('Erro atualizando medicamento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao atualizar medicamento' });
  }
};

export const excluirMedicamento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;

    const medicamento = await Medicamento.findOne({ where: { id, usuario_id: usuario.id } });
    if (!medicamento) {
      return res.status(404).json({ status: 'erro', mensagem: 'Medicamento não encontrado' });
    }

    await medicamento.destroy();
    return res.status(200).json({ status: 'sucesso', mensagem: 'Medicamento removido com sucesso' });
  } catch (erro) {
    console.error('Erro removendo medicamento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao remover medicamento' });
  }
};