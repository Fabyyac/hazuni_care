import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  async function enviarAlteracao(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const resposta = await api.put('/perfil/senha', {
        senhaAtual,
        novaSenha
      });

      setSucesso(resposta.data.mensagem || 'Senha atualizada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } catch (err: any) {
      console.error('Erro alterando senha:', err.response?.data || err.message);
      setErro(err.response?.data?.mensagem || 'Não foi possível alterar a senha.');
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Alterar senha</h2>

        {erro && <p style={estilos.erro}>{erro}</p>}
        {sucesso && <p style={estilos.sucesso}>{sucesso}</p>}

        <form onSubmit={enviarAlteracao} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Senha atual</label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <div style={estilos.campo}>
            <label>Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <div style={estilos.campo}>
            <label>Confirmar nova senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              style={estilos.input}
            />
          </div>

          <button type="submit" style={estilos.botaoSalvar}>
            Salvar nova senha
          </button>
        </form>

        <button style={estilos.botaoVoltar} onClick={() => navigate('/perfil')}>
          Voltar para o perfil
        </button>
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
    maxWidth: '520px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'
  },
  logo: {
    width: '180px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 24px auto'
  },
  titulo: {
    textAlign: 'center' as const,
    color: '#1E293B',
    marginBottom: '24px'
  },
  erro: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '16px',
    textAlign: 'center' as const
  },
  sucesso: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '16px',
    textAlign: 'center' as const
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '18px',
    marginBottom: '24px'
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
  botaoVoltar: {
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
    border: '1px solid #CBD5E1',
    borderRadius: '10px',
    padding: '14px',
    cursor: 'pointer',
    width: '100%'
  }
};