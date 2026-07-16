import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';

export default function Home() {
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('@hazuni:usuario');
    
    if (!dadosSalvos) {
      navigate('/login');
      return;
    }

    const usuarioLogado = JSON.parse(dadosSalvos);
    setUsuario(usuarioLogado);
    setCarregando(false);
  }, [navigate]);

  function sairDaConta() {
    localStorage.removeItem('@hazuni:token');
    localStorage.removeItem('@hazuni:usuario');
    navigate('/login');
  }

  if (carregando) {
    return <div style={estilos.telaCarregando}>Carregando...</div>;
  }

  return (
    <div style={estilos.tela}>
      <header style={estilos.cabecalho}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <button onClick={sairDaConta} style={estilos.botaoSair}>Sair</button>
      </header>

      <main style={estilos.conteudo}>
        <h2 style={estilos.saudacao}>Olá, {usuario.nome}! 🤗</h2>
        <p style={estilos.descricao}>Bem-vindo ao seu espaço de saúde e bem-estar.</p>

        <div style={estilos.gridOpcoes}>
          <button style={estilos.cartaoOpcao} onClick={() => navigate('/hazuni-ia')}>
            <h3>Hazuni IA</h3>
            <p>Converse com nossa assistente inteligente</p>
          </button>

          <button style={estilos.cartaoOpcao} onClick={() => navigate('/agenda')}>
            <h3>Agenda</h3>
            <p>Gerencie consultas e compromissos</p>
          </button>

          <button style={estilos.cartaoOpcao} onClick={() => navigate('/medicamentos')}>
            <h3>Medicamentos</h3>
            <p>Acompanhe seus remédios e horários</p>
          </button>

          <button style={estilos.cartaoOpcao} onClick={() => navigate('/documentos')}>
            <h3>Documentos</h3>
            <p>Gerencie seus arquivos e receitas</p>
          </button>

          <button style={estilos.cartaoOpcao} onClick={() => navigate('/notificacoes')}>
            <h3>Notificações</h3>
            <p>Lembretes e avisos importantes</p>
          </button>

          <button style={estilos.cartaoOpcao} onClick={() => navigate('/perfil')}>
            <h3>Meu Perfil</h3>
            <p>Atualize seus dados pessoais</p>
          </button>
        </div>
      </main>
    </div>
  );
}

const estilos = {
  telaCarregando: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#1E293B'
  },
  tela: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    fontFamily: 'Arial, sans-serif'
  },
  cabecalho: {
    backgroundColor: '#2563EB',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    height: '60px',
    width: 'auto'
  },
  botaoSair: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer'
  },
  conteudo: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  saudacao: {
    fontSize: '28px',
    color: '#1E293B',
    marginBottom: '10px'
  },
  descricao: {
    fontSize: '16px',
    color: '#64748B',
    marginBottom: '40px'
  },
  gridOpcoes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  cartaoOpcao: {
    backgroundColor: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '30px 20px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }
};