import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import Logo from '../../assets/logo.png';
import { api } from '../../services/api';

interface Medicamento {
  id: number;
  nome: string;
  dosagem: string;
  frequencia: string;
  horario: string;
  vencimento: string;
  ativo: boolean;
}

export default function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [horario, setHorario] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  async function carregarMedicamentos() {
    try {
      const resposta = await api.get('/medicamentos');
      setMedicamentos(resposta.data.dados);
    } catch (err: any) {
      console.error('Erro carregando medicamentos:', err.response?.data || err.message);
      if (err.response?.status === 401) navigate('/login');
    }
  }

  async function adicionarMedicamento(e: FormEvent) {
    e.preventDefault();
    setErro('');

    if (!nome.trim() || !dosagem.trim() || !frequencia.trim() || !horario || !vencimento) {
      setErro('Preencha todos os campos do medicamento');
      return;
    }

    try {
      await api.post('/medicamentos', { nome, dosagem, frequencia, horario, vencimento });
      setNome('');
      setDosagem('');
      setFrequencia('');
      setHorario('');
      setVencimento('');
      carregarMedicamentos();
    } catch (err: any) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar medicamento');
    }
  }

  async function removerMedicamento(id: number) {
    try {
      await api.delete(`/medicamentos/${id}`);
      carregarMedicamentos();
    } catch (err: any) {
      console.error('Erro removendo medicamento:', err.response?.data || err.message);
    }
  }

  return (
    <div style={estilos.tela}>
      <div style={estilos.caixa}>
        <img src={Logo} alt="Hazuni Care" style={estilos.logo} />
        <h2 style={estilos.titulo}>Medicamentos</h2>

        <form onSubmit={adicionarMedicamento} style={estilos.formulario}>
          <div style={estilos.campo}>
            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} style={estilos.input} />
          </div>
          <div style={estilos.duasColunas}>
            <div style={estilos.campo}>
              <label>Dose</label>
              <input value={dosagem} onChange={(e) => setDosagem(e.target.value)} style={estilos.input} />
            </div>
            <div style={estilos.campo}>
              <label>Frequência</label>
              <input value={frequencia} onChange={(e) => setFrequencia(e.target.value)} style={estilos.input} placeholder="Ex: 2x por dia" />
            </div>
          </div>
          <div style={estilos.duasColunas}>
            <div style={estilos.campo}>
              <label>Horário</label>
              <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} style={estilos.input} />
            </div>
            <div style={estilos.campo}>
              <label>Vencimento</label>
              <input type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} style={estilos.input} />
            </div>
          </div>
          {erro && <p style={estilos.erro}>{erro}</p>}
          <button type="submit" style={estilos.botaoSalvar}>Adicionar medicamento</button>
        </form>

        <div style={estilos.lista}>
          {medicamentos.length === 0 ? (
            <p style={estilos.vazio}>Nenhum medicamento cadastrado.</p>
          ) : (
            medicamentos.map((medicamento) => (
              <div key={medicamento.id} style={estilos.item}>
                <div>
                  <h3 style={estilos.itemTitulo}>{medicamento.nome}</h3>
                  <p style={estilos.itemSubtitulo}>{medicamento.dosagem} • {medicamento.frequencia}</p>
                  <p style={estilos.itemDescricao}>Horário: {medicamento.horario} • Vence em {medicamento.vencimento}</p>
                </div>
                <button onClick={() => removerMedicamento(medicamento.id)} style={estilos.botaoRemover}>Remover</button>
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