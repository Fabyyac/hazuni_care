import { Request, Response } from 'express';

// Fallback local (mais leve) — mantém respostas mesmo se LLM falhar
function gerarRespostaHazuniLocal(mensagem: string, nomeUsuario?: string): string {
  const texto = mensagem.toLowerCase();
  if (texto.includes('oi') || texto.includes('olá') || texto.includes('ola')) {
    return `Olá${nomeUsuario ? ', ' + nomeUsuario : ''}! 😊 Como você está hoje?`;
  }
  if (texto.includes('bom dia')) return `Bom dia${nomeUsuario ? ', ' + nomeUsuario : ''}! ☀️`;
  if (texto.includes('boa tarde')) return `Boa tarde${nomeUsuario ? ', ' + nomeUsuario : ''}! 💙`;
  if (texto.includes('boa noite')) return `Boa noite${nomeUsuario ? ', ' + nomeUsuario : ''}! 🌙`;
  if (texto.includes('enterogermina')) {
    return `A Enterogermina é um probiótico usado para ajudar na restauração da flora intestinal. Consulte um profissional de saúde para orientações específicas.`;
  }
  if (texto.includes('remédio') || texto.includes('remedio')) {
    return `Diga o nome do medicamento que eu tento explicar. Lembre-se: só um profissional pode orientar sobre posologia e contraindicações.`;
  }
  if (texto.includes('dor') || texto.includes('febre') || texto.includes('mal estar') || texto.includes('náusea') || texto.includes('nausea')) {
    return `Se você está com sintomas como dor ou febre, procure um profissional de saúde. Posso dar informações gerais.`;
  }
  return `Entendi. 😊\n\nPode me contar um pouco mais? Estou aqui para ajudar com suas dúvidas.`;
}

// Chamada à Gemini (Generative Language) com suporte a dois modos de autenticação
async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.KEY_GEMINI_API_KEY || process.env.KEY_GEMINI_API;
  const model = process.env.GEMINI_MODEL || process.env.KEY_GEMINI_MODEL || 'gemini-pro';
  if (!apiKey) throw new Error('GEMINI_API_KEY não configurada');

  // Se a variável GEMINI_USE_BEARER estiver 'true' (ou KEY_GEMINI_USE_BEARER), usamos Authorization: Bearer
  const useBearer = ((process.env.GEMINI_USE_BEARER || process.env.KEY_GEMINI_USE_BEARER || 'false').toString()).toLowerCase() === 'true';

  // Endpoint genérico para Generative Language API. Dependendo da chave, pode precisar ajustar URL.
  let url = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(model)}:generateText`;
  if (!useBearer) {
    // alguns formatos aceitam ?key=API_KEY
    url += `?key=${encodeURIComponent(apiKey)}`;
  }

  const body = {
    prompt: { text: prompt },
    temperature: 0.7,
    maxOutputTokens: 512
  } as any;

  const headers: any = { 'Content-Type': 'application/json' };
  if (useBearer) headers.Authorization = `Bearer ${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${t}`);
  }

  const data = await res.json();

  // Extrair texto com heurística defensiva
  // 1) Verifica candidates[0].content
  if (data?.candidates?.[0]?.content) {
    const c = data.candidates[0].content;
    if (typeof c === 'string') return c;
    if (Array.isArray(c)) return c.map((it: any) => it?.text || '').join('\n');
    if (c?.text) return c.text;
  }

  // 2) saída comum: data.output or data.result
  if (data?.output?.[0]?.content?.[0]?.text) return data.output[0].content[0].text;
  if (data?.result?.output?.[0]?.text) return data.result.output[0].text;

  // Fallback para debug: stringify
  return JSON.stringify(data);
}

export const conversar = async (req: Request, res: Response) => {
  const { mensagem } = req.body;
  const usuario = (req as any).usuario;

  if (!mensagem || typeof mensagem !== 'string') {
    return res.status(400).json({ status: 'erro', mensagem: 'A mensagem informada é inválida.' });
  }

  const provider = (process.env.LLM_PROVIDER || process.env.KEY_LLM_PROVIDER || 'local').toLowerCase();

  try {
    if (provider === 'gemini') {
      const system = `Você é a Hazuni IA — uma assistente humana, empática e acolhedora do Hazuni Care. Sempre responda com calor humano, use uma linguagem simples e compreensiva, valide os sentimentos do usuário, ofereça passos práticos e seguros, e quando necessário recomende procurar um profissional de saúde. Nunca forneça diagnóstico médico, nem solicite dados sensíveis (CPF, senhas, documentos). Seja breve quando o usuário pedir algo rápido, e mais detalhada quando necessário. Exemplo de tom:\n- "Sinto muito que você esteja passando por isso. Estou aqui para ajudar. Você pode me contar mais sobre os sintomas?"\n- "Entendo, isso deve ser difícil. Se sentir dor intensa ou febre, procure atendimento imediatamente."\nResponda sempre no papel de Hazuni IA, assinando mentalmente como 'Hazuni'.`;
      const prompt = `${system}\n\nHistórico: se disponível, inclua o nome do usuário: ${usuario?.nome || 'Usuário'}\n\nPergunta: ${mensagem}\n\nResposta da Hazuni:`;

      const respostaGemini = await callGemini(prompt);
      const texto = respostaGemini || gerarRespostaHazuniLocal(mensagem, usuario?.nome);

      return res.status(200).json({ status: 'sucesso', resposta: texto });
    } else {
      const texto = gerarRespostaHazuniLocal(mensagem, usuario?.nome);
      return res.status(200).json({ status: 'sucesso', resposta: texto });
    }
  } catch (err) {
    console.error('IA error:', err);
    const texto = gerarRespostaHazuniLocal(mensagem, usuario?.nome);
    return res.status(200).json({ status: 'sucesso', resposta: texto });
  }
};