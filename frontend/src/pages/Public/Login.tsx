import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import Logo from '../../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await api.post('/auth/login', { email, senha });
      
      // ✅ Usa exatamente a estrutura que seu controlador retorna
      const { token, usuario } = resposta.data.dados;
      
      localStorage.setItem('@hazuni:token', token);
      localStorage.setItem('@hazuni:usuario', JSON.stringify(usuario));
      
      navigate('/home');
    } catch (erro: any) {
      console.error('Erro completo:', erro.response?.data || erro.message);
      setErro(erro.response?.data?.mensagem || 'E-mail ou senha inválidos!');
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Entrar na sua conta</h2>

        {erro && <p style={estilos.erro}>{erro}</p>}

        <form onSubmit={fazerLogin} style={estilos.formulario}>
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

          <div style={estilos.campo}>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <button type="submit" style={estilos.botao}>Entrar</button>
        </form>

        <p style={estilos.link}>
          Não tem conta? <a onClick={() => navigate('/cadastro')}>Criar conta</a>
        </p>
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
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px'
  },
  logo: {
    width: '200px',
    display: 'block',
    margin: '0 auto 30px auto'
  },
  titulo: {
    textAlign: 'center' as const,
    color: '#1E293B',
    marginBottom: '25px'
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    marginBottom: '15px'
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
    fontSize: '15px'
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
    marginTop: '5px'
  },
  link: {
    textAlign: 'center' as const,
    marginTop: '25px',
    fontSize: '14px',
    color: '#64748B'
  }
};