import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import User from '../models/User';

interface AuthRequest extends Request {
  usuario?: any;
}

const montarDadosUsuario = (usuario: any) => {
  const { id, nome, email, foto, status, criado_em, atualizado_em } = usuario;
  return { id, nome, email, foto, status, criado_em, atualizado_em };
};

export const verPerfil = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    if (!usuario) {
      return res.status(401).json({ status: 'erro', mensagem: 'Usuário não autenticado' });
    }

    return res.status(200).json({
      status: 'sucesso',
      mensagem: 'Perfil carregado com sucesso',
      dados: montarDadosUsuario(usuario)
    });
  } catch (erro) {
    console.error('Erro ao carregar perfil:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro interno ao carregar perfil' });
  }
};

export const atualizarPerfil = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    if (!usuario) {
      return res.status(401).json({ status: 'erro', mensagem: 'Usuário não autenticado' });
    }

    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ status: 'erro', mensagem: 'Nome e e-mail são obrigatórios' });
    }

    const existeOutro = await User.findOne({
      where: {
        email,
        id: { [Op.ne]: usuario.id }
      }
    });

    if (existeOutro) {
      return res.status(400).json({ status: 'erro', mensagem: 'Este e-mail já está em uso por outro usuário' });
    }

    usuario.nome = nome;
    usuario.email = email;
    await usuario.save();

    return res.status(200).json({
      status: 'sucesso',
      mensagem: 'Perfil atualizado com sucesso',
      dados: montarDadosUsuario(usuario)
    });
  } catch (erro) {
    console.error('Erro ao atualizar perfil:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro interno ao atualizar perfil' });
  }
};

export const alterarSenha = async (req: AuthRequest, res: Response) => {
  try {
    const usuario = req.usuario;
    if (!usuario) {
      return res.status(401).json({ status: 'erro', mensagem: 'Usuário não autenticado' });
    }

    const { senhaAtual, novaSenha } = req.body;
    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ status: 'erro', mensagem: 'Senha atual e nova senha são obrigatórias' });
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(400).json({ status: 'erro', mensagem: 'Senha atual incorreta' });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ status: 'erro', mensagem: 'A nova senha deve ter pelo menos 6 caracteres' });
    }

    usuario.senha_hash = await bcrypt.hash(novaSenha, 10);
    await usuario.save();

    return res.status(200).json({ status: 'sucesso', mensagem: 'Senha alterada com sucesso' });
  } catch (erro) {
    console.error('Erro ao alterar senha:', erro);
    return res.status(500).json({ status: 'erro', mensagem: 'Erro interno ao alterar a senha' });
  }
};