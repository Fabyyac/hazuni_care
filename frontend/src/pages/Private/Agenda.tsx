import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

interface Evento {
  id: number;
  titulo: string;
  descricao?: string;
  data: string;
  hora: string;
  concluido: boolean;
}

export default function Agenda() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    try {
      const resposta = await api.get('/agenda');
      setEventos(resposta.data.dados);
    } catch (err: any) {
      console.error('Erro carregando agenda:', err.response?.data || err.message);
      if (err.response?.status === 401) navigate('/login');
    }
  }

  async function adicionarEvento(e: FormEvent) {
    e.preventDefault();
    setErro('');

    if (!titulo.trim() || !data || !hora) {
      setErro('Título, data e hora são obrigatórios');
      return;
    }

    try {
      await api.post('/agenda', { titulo, descricao, data, hora });
      setTitulo('');
      setDescricao('');
      setData('');
      setHora('');
      carregarEventos();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar evento');
    }
  }

  async function removerEvento(id: number) {
    try {
      await api.delete(`/agenda/${id}`);
      carregarEventos();
    } catch (err: any) {
      console.error('Erro removendo evento:', err.response?.data || err.message);
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Agenda</h2>

        <form onSubmit={adicionarEvento} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} style={estilos.input} />
          </div>
          <div style={estilos.campo}>
            <label>Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} style={estilos.textarea} />
          </div>
          <div style={estilos.duasColunas}>
            <div style={estilos.campo}>
              <label>Data</label>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} style={estilos.input} />
            </div>
            <div style={estilos.campo}>
              <label>Hora</label>
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} style={estilos.input} />
            </div>
          </div>
          {erro && <p style={estilos.erro}>{erro}</p>}
          <button type="submit" style={estilos.botaoSalvar}>Adicionar evento</button>
        </form>

        <div style={estilos.lista}>
          {eventos.length === 0 ? (
            <p style={estilos.vazio}>Nenhum evento agendado.</p>
          ) : (
            eventos.map((evento) => (
              <div key={evento.id} style={estilos.item}>
                <div>
                  <h3 style={estilos.itemTitulo}>{evento.titulo}</h3>
                  <p style={estilos.itemSubtitulo}>{evento.data} • {evento.hora}</p>
                  {evento.descricao && <p style={estilos.itemDescricao}>{evento.descricao}</p>}
                </div>
                <button onClick={() => removerEvento(evento.id)} style={estilos.botaoRemover}>Remover</button>
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
  duasColunas: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px'
  },
  input: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    fontSize: '16px'
  },
  textarea: {
    minHeight: '100px',
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
  botaoRemover: {
    backgroundColor: '#FEE2E2',
    border: 'none',
    borderRadius: '10px',
    color: '#DC2626',
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