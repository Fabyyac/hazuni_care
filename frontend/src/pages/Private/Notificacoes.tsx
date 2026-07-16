import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  createdAt: string;
}

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  async function carregarNotificacoes() {
    try {
      const resposta = await api.get('/notificacoes');
      setNotificacoes(resposta.data.dados);
    } catch (err: any) {
      console.error('Erro carregando notificações:', err.response?.data || err.message);
      if (err.response?.status === 401) navigate('/login');
    }
  }

  async function adicionarNotificacao(e: FormEvent) {
    e.preventDefault();
    setErro('');

    if (!titulo.trim() || !mensagem.trim()) {
      setErro('Título e mensagem são obrigatórios');
      return;
    }

    try {
      await api.post('/notificacoes', { titulo, mensagem });
      setTitulo('');
      setMensagem('');
      carregarNotificacoes();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar notificação');
    }
  }

  async function marcarLida(id: number) {
    try {
      await api.put(`/notificacoes/${id}/lida`);
      carregarNotificacoes();
    } catch (err: any) {
      console.error('Erro atualizando notificação:', err.response?.data || err.message);
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Notificações</h2>

        <form onSubmit={adicionarNotificacao} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} style={estilos.input} />
          </div>
          <div style={estilos.campo}>
            <label>Mensagem</label>
            <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} style={estilos.textarea} />
          </div>
          {erro && <p style={estilos.erro}>{erro}</p>}
          <button type="submit" style={estilos.botaoSalvar}>Criar notificação</button>
        </form>

        <div style={estilos.lista}>
          {notificacoes.length === 0 ? (
            <p style={estilos.vazio}>Nenhuma notificação encontrada.</p>
          ) : (
            notificacoes.map((notificacao) => (
              <div key={notificacao.id} style={{ ...estilos.item, opacity: notificacao.lida ? 0.7 : 1 }}>
                <div>
                  <h3 style={estilos.itemTitulo}>{notificacao.titulo}</h3>
                  <p style={estilos.itemSubtitulo}>{new Date(notificacao.createdAt).toLocaleString()}</p>
                  <p style={estilos.itemDescricao}>{notificacao.mensagem}</p>
                </div>
                {!notificacao.lida && (
                  <button onClick={() => marcarLida(notificacao.id)} style={estilos.botaoAcao}>Marcar como lida</button>
                )}
              </div>
            ))
          )}
        </div>

        <button style={estilos.botaoVoltar} onClick={() => navigate('/home')}>Voltar para o início</button>
      </div>
    </div>
  );
}

const estilos = {
  tela: {
    minHeight: '100vh',
    backgroundColor: '#F0F4F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  caixa: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
  },
  logo: {
    width: '200px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 24px auto'
  },
  titulo: {
    fontSize: '28px',
    color: '#1E293B',
    textAlign: 'center' as const,
    marginBottom: '24px'
  },
  formulario: {
    display: 'grid',
    gap: '18px',
    marginBottom: '30px'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  input: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    fontSize: '16px'
  },
  textarea: {
    minHeight: '120px',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    fontSize: '16px'
  },
  botaoSalvar: {
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '14px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold' as const
  },
  lista: {
    display: 'grid',
    gap: '16px'
  },
  vazio: {
    textAlign: 'center' as const,
    color: '#64748B'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC'
  },
  itemTitulo: {
    margin: 0,
    fontSize: '18px',
    color: '#0F172A'
  },
  itemSubtitulo: {
    margin: '8px 0',
    color: '#475569'
  },
  itemDescricao: {
    margin: 0,
    color: '#334155'
  },
  botaoAcao: {
    backgroundColor: '#2563EB',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    padding: '12px 18px',
    cursor: 'pointer'
  },
  botaoVoltar: {
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
    border: '1px solid #CBD5E1',
    borderRadius: '10px',
    padding: '14px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '24px'
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '10px',
    textAlign: 'center' as const
  }
};