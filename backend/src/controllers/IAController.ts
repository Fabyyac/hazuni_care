import { Request, Response } from 'express';
import type User from '../models/User';

const gerarRespostaHazuni = (mensagem: string, nomeUsuario?: string): string => {
  const texto = mensagem.toLowerCase();

  if (texto.includes('oi') || texto.includes('olá') || texto.includes('ola') || texto.includes('bom dia') || texto.includes('boa tarde') || texto.includes('boa noite')) {
    if (texto.includes('bom dia')) {
      return `Bom dia${nomeUsuario ? `, ${nomeUsuario}` : ''}! ☀️ Como posso ajudar você hoje?`;
    }
    if (texto.includes('boa tarde')) {
      return `Boa tarde${nomeUsuario ? `, ${nomeUsuario}` : ''}! 💙 Em que posso ser útil?`;
    }
    if (texto.includes('boa noite')) {
      return `Boa noite${nomeUsuario ? `, ${nomeUsuario}` : ''}! 🌙 Precisa de alguma orientação ou informação?`;
    }

    return `Olá${nomeUsuario ? `, ${nomeUsuario}` : ''}! 😊 Estou aqui para conversar e ajudar no que você precisar.`;
  }

  if (texto.includes('enterogermina')) {
    return `A Enterogermina é um probiótico usado para ajudar na restauração da flora intestinal. Ela pode ser útil em casos de diarreia, desconforto abdominal ou após uso de antibióticos. Mas sempre consulte um profissional de saúde antes de iniciar qualquer tratamento.`;
  }

  if (texto.includes('para que serve') && texto.includes('remédio')) {
    return `Remédios têm funções específicas de acordo com o princípio ativo. Alguns aliviam dor, outros combatem infecções ou regulam o organismo. Informe o nome completo do medicamento para que eu possa explicar melhor.`;
  }

  if (texto.includes('remédio') || texto.includes('remedio')) {
    return `Se você tem dúvidas sobre um medicamento, me diga o nome e o motivo do uso. Lembre-se: somente um médico ou farmacêutico pode orientar corretamente sobre posologia e contraindicações.`;
  }

  if (texto.includes('medicamento') && texto.includes('como') && texto.includes('tomar')) {
    return `A forma de tomar um medicamento depende do tipo dele. Alguns são líquidos, outros comprimidos ou cápsulas. Siga sempre a orientação do profissional de saúde ou as instruções da bula.`;
  }

  if (texto.includes('dor') || texto.includes('febre') || texto.includes('mal estar') || texto.includes('náusea') || texto.includes('nausea')) {
    return `Se você está sentindo sintomas como dor, febre ou mal-estar, é importante conversar com um profissional de saúde. Posso ajudar com informações gerais, mas não substituo uma avaliação médica.`;
  }

  if (texto.includes('quem é você') || texto.includes('quem voce') || texto.includes('o que você é') || texto.includes('oque voce')) {
    return `Eu sou a Hazuni IA, um assistente digital do Hazuni Care. Posso tirar dúvidas gerais, mas não substituo um médico.`;
  }

  if (texto.includes('obrigado') || texto.includes('obrigada') || texto.includes('vlw') || texto.includes('valeu')) {
    return `De nada! 😊 Estou aqui sempre que você precisar.`;
  }

  return `Entendi. 😊

Pode me contar um pouco mais? Estou aqui para ajudar com suas dúvidas.`;
};

export const conversar = async (req: Request, res: Response) => {
  const { mensagem } = req.body;
  const usuario = (req as any).usuario as User | undefined;

  if (!mensagem || typeof mensagem !== 'string') {
    return res.status(400).json({ status: 'erro', mensagem: 'A mensagem informada é inválida.' });
  }

  const resposta = gerarRespostaHazuni(mensagem, usuario?.nome || '');

  return res.status(200).json({ status: 'sucesso', resposta });
};
