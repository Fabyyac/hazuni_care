import { Request, Response } from 'express';
import Documento from '../models/Documento';

interface AuthRequest extends Request {
  usuario?: any;
}

export const listarDocumentos = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const itens = await Documento.findAll({ where: { usuario_id: usuario.id }, order: [['createdAt', 'DESC']] });
    return res.status(200).json({ status: 'sucesso', dados: itens });
  } catch (erro) {
    console.error('Erro listando documentos:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao listar documentos' });
  }
};

export const criarDocumento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { titulo, descricao, url, categoria } = req.body;

    if (!titulo || !categoria) {
      return res.status(400).json({ status: 'erro', mensagem: 'Título e categoria são obrigatórios' });
    }

    const documento = await Documento.create({
      titulo,
      descricao,
      url,
      categoria,
      usuario_id: usuario.id
    });

    return res.status(201).json({ status: 'sucesso', dados: documento });
  } catch (erro) {
    console.error('Erro criando documento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao criar documento' });
  }
};

export const excluirDocumento = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    const { id } = req.params;

    const documento = await Documento.findOne({ where: { id, usuario_id: usuario.id } });
    if (!documento) {
      return res.status(404).json({ status: 'erro', mensagem: 'Documento não encontrado' });
    }

    await documento.destroy();
    return res.status(200).json({ status: 'sucesso', mensagem: 'Documento removido com sucesso' });
  } catch (erro) {
    console.error('Erro removendo documento:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro ao remover documento' });
  }
};