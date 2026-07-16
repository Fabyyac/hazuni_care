import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'hazuni_secret_2026';

// ✅ LOGIN — exportação correta
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario || !usuario.status) {
      return res.status(401).json({ 
        status: 'erro', 
        mensagem: 'Credenciais inválidas ou conta inativa' 
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ 
        status: 'erro', 
        mensagem: 'Credenciais inválidas' 
      });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      status: 'sucesso',
      mensagem: 'Login realizado com sucesso',
      dados: {
        token,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, foto: usuario.foto }
      }
    });
  } catch (erro) {
    console.error('Erro no login:', erro);
    return res.status(500).json({ 
      status: 'erro', 
      mensagem: 'Erro interno no servidor' 
    });
  }
};

// ✅ CADASTRO — SEM TELEFONE, exportação correta
export const cadastrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    // Valida campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        status: 'erro', 
        mensagem: 'Preencha nome, e-mail e senha!' 
      });
    }

    // Verifica se e-mail já existe
    const existente = await User.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ 
        status: 'erro', 
        mensagem: 'E-mail já cadastrado' 
      });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria usuário — SEM TELEFONE
    const usuario = await User.create({
      nome,
      email,
      senha_hash: senhaHash,
      status: true
    });

    return res.status(201).json({
      status: 'sucesso',
      mensagem: 'Conta criada com sucesso!',
      dados: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  } catch (erro: any) {
    console.error('Erro no cadastro:', erro);
    return res.status(500).json({ 
      status: 'erro', 
      mensagem: 'Não foi possível criar a conta!' 
    });
  }
};