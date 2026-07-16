import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
// ✅ Importa a logo da pasta assets
import Logo from '../../assets/logo.png';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  async function enviarCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validações conforme regras de negócio
    if (senha !== confirmaSenha) {
      setErro('As senhas não coincidem! Verifique e tente novamente.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    try {
      await api.post('/auth/cadastro', {
        nome,
        email,
        senha
      });

      setSucesso('Conta criada com sucesso! Em instantes você será redirecionado para fazer login.');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Não foi possível criar a conta! Verifique os dados e tente novamente.');
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        {/* ✅ Logo no topo da tela de Cadastro */}
        <img 
          src={Logo} 
          alt="Hazuni Care" 
          style={estilos.logo}
        />
        <h2 style={estilos.titulo}>Criar conta no Hazuni Care</h2>

        {erro && <p style={estilos.erro}>{erro}</p>}
        {sucesso && <p style={estilos.sucesso}>{sucesso}</p>}

        <form onSubmit={enviarCadastro} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={estilos.input}
              placeholder="Digite seu nome completo"
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
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div style={estilos.campo}>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={estilos.input}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div style={estilos.campo}>
            <label>Confirmar senha</label>
            <input
              type="password"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
              style={estilos.input}
              placeholder="Digite a senha novamente"
            />
          </div>

          <button type="submit" style={estilos.botao}>Cadastrar</button>
        </form>

        <p style={estilos.link}>
          Já tem uma conta? <a onClick={() => navigate('/login')}>Fazer login</a>
        </p>
      </div>
    </div>
  );
}

const estilos = {
  tela: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    margin: 0,
    padding: 0
  },
  caixa: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px'
  },
  logo: {
    // ✅ Mesmo tamanho e estilo da tela de Login
    width: '200px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 30px auto'
  },
  titulo: {
    textAlign: 'center' as const,
    color: '#1E293B',
    marginBottom: '20px',
    marginTop: 0,
    fontSize: '22px'
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    marginBottom: '15px',
    fontSize: '14px'
  },
  sucesso: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    marginBottom: '15px',
    fontSize: '14px'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  input: {
    padding: '12px',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.2s'
  },
  botao: {
    padding: '13px',
    backgroundColor: '#2563EB',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    marginTop: '5px',
    transition: 'background-color 0.2s'
  },
  link: {
    textAlign: 'center' as const,
    marginTop: '25px',
    color: '#64748B',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};