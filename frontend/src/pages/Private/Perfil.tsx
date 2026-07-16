import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Key, LogOut } from 'lucide-react';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

export default function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  // Carrega dados do usuário logado
  useEffect(() => {
    async function carregarPerfil() {
      const token = localStorage.getItem('@hazuni:token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const resposta = await api.get('/perfil');
        const usuarioApi = resposta.data.dados;

        setUsuario(usuarioApi);
        setNome(usuarioApi.nome);
        setEmail(usuarioApi.email);
        localStorage.setItem('@hazuni:usuario', JSON.stringify(usuarioApi));
      } catch (err: any) {
        console.error('Erro carregando perfil:', err.response?.data || err.message);
        navigate('/login');
      }
    }

    carregarPerfil();
  }, [navigate]);

  // Salva alterações no perfil
  async function salvarPerfil(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      const resposta = await api.put('/perfil', { nome, email });
      const dadosAtualizados = resposta.data.dados;

      localStorage.setItem('@hazuni:usuario', JSON.stringify(dadosAtualizados));
      setUsuario(dadosAtualizados);
      
      setSucesso('Perfil atualizado com sucesso!');
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Não foi possível atualizar o perfil!');
    }
  }

  // Função para sair
  function sair() {
    localStorage.removeItem('@hazuni:token');
    localStorage.removeItem('@hazuni:usuario');
    navigate('/login');
  }

  if (!usuario) return <div style={estilos.carregando}>Carregando...</div>;

  return (
    <div style={estilos.tela}>
      {/* Cabeçalho */}
      <header style={estilos.cabecalho}>
        <div style={estilos.cabecalhoEsquerda}>
          <img src={Logo} alt="Hazuni Care" style={estilos.logoCabecalho} />
          <h1 style={estilos.titulo}>Meu Perfil</h1>
        </div>
        <button onClick={() => navigate('/home')} style={estilos.botaoVoltar}>← Voltar</button>
      </header>

      <main style={estilos.conteudo}>
        <div style={estilos.caixa}>
          <div style={estilos.fotoPerfil}>
            <User size={48} color="#2563EB" />
          </div>

          {erro && <p style={estilos.erro}>{erro}</p>}
          {sucesso && <p style={estilos.sucesso}>{sucesso}</p>}

          <form onSubmit={salvarPerfil} style={estilos.formulario}>
            <div style={estilos.campo}>
              <label>Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={estilos.input}
              />
            </div>

            <div style={estilos.campo}>
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={estilos.input}
              />
            </div>

            <button type="submit" style={estilos.botaoSalvar}>
              <Edit size={18} />
              Salvar alterações
            </button>
          </form>

          <div style={estilos.acoes}>
            <button style={estilos.botaoSecundario} onClick={() => navigate('/alterar-senha')}>
              <Key size={18} />
              Alterar senha
            </button>
            <button style={estilos.botaoSair} onClick={sair}>
              <LogOut size={18} />
              Sair da conta
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const estilos = {
  tela: {
    minHeight: '100vh',
    backgroundColor: '#F0F4F8',
    padding: '20px'
  },
  carregando: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#64748B'
  },
  cabecalho: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '30px',
    flexWrap: 'wrap' as const,
    gap: '15px'
  },
  cabecalhoEsquerda: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logoCabecalho: {
    width: '60px',
    height: 'auto'
  },
  titulo: {
    fontSize: '24px',
    color: '#1E293B',
    margin: 0
  },
  botaoVoltar: {
    padding: '10px 20px',
    backgroundColor: '#E2E8F0',
    color: '#1E293B',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500' as const
  },
  conteudo: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  caixa: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  fotoPerfil: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#EFF6FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px auto'
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'center' as const,
    marginBottom: '15px'
  },
  sucesso: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'center' as const,
    marginBottom: '15px'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    marginBottom: '30px'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  input: {
    padding: '12px',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    fontSize: '16px'
  },
  botaoSalvar: {
    padding: '12px',
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  acoes: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  botaoSecundario: {
    padding: '12px',
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  botaoSair: {
    padding: '12px',
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }
};