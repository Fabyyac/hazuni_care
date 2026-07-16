import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

interface Documento {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  url?: string;
  createdAt: string;
}

export default function Documentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('receita');
  const [url, setUrl] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarDocumentos();
  }, []);

  async function carregarDocumentos() {
    try {
      const resposta = await api.get('/documentos');
      setDocumentos(resposta.data.dados);
    } catch (err: any) {
      console.error('Erro carregando documentos:', err.response?.data || err.message);
      if (err.response?.status === 401) navigate('/login');
    }
  }

  async function adicionarDocumento(e: FormEvent) {
    e.preventDefault();
    setErro('');

    if (!titulo.trim()) {
      setErro('Título é obrigatório');
      return;
    }

    try {
      await api.post('/documentos', { titulo, descricao, categoria, url });
      setTitulo('');
      setDescricao('');
      setCategoria('receita');
      setUrl('');
      carregarDocumentos();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar documento');
    }
  }

  async function removerDocumento(id: number) {
    try {
      await api.delete(`/documentos/${id}`);
      carregarDocumentos();
    } catch (err: any) {
      console.error('Erro removendo documento:', err.response?.data || err.message);
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Documentos</h2>

        <form onSubmit={adicionarDocumento} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} style={estilos.input} required />
          </div>

          <div style={estilos.campo}>
            <label>Categoria</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={estilos.input}>
              <option value="receita">Receita</option>
              <option value="exame">Exame</option>
              <option value="relatorio">Relatório</option>
              <option value="geral">Geral</option>
            </select>
          </div>

          <div style={estilos.campo}>
            <label>Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} style={estilos.textarea} />
          </div>

          <div style={estilos.campo}>
            <label>URL do documento (opcional)</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} style={estilos.input} placeholder="https://" />
          </div>

          {erro && <p style={estilos.erro}>{erro}</p>}

          <button type="submit" style={estilos.botaoSalvar}>Salvar documento</button>
        </form>

        <div style={estilos.lista}>
          {documentos.length === 0 ? (
            <p style={estilos.vazio}>Nenhum documento cadastrado ainda.</p>
          ) : (
            documentos.map((doc) => (
              <div key={doc.id} style={estilos.item}>
                <div>
                  <h3 style={estilos.itemTitulo}>{doc.titulo}</h3>
                  <p style={estilos.itemSubtitulo}>{doc.categoria} • {new Date(doc.createdAt).toLocaleDateString()}</p>
                  {doc.descricao && <p style={estilos.itemDescricao}>{doc.descricao}</p>}
                  {doc.url && (
                    <a href={doc.url} target="_blank" rel="noreferrer" style={estilos.link}>Abrir documento</a>
                  )}
                </div>
                <button onClick={() => removerDocumento(doc.id)} style={estilos.botaoRemover}>Remover</button>
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
  link: {
    color: '#2563EB',
    textDecoration: 'none'
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