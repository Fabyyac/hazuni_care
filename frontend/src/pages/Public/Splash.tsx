import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ Caminho correto da logo
import Logo from '../../assets/logo.png';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const tempo = setTimeout(() => {
      const temToken = localStorage.getItem('@hazuni:token');
      if (temToken) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(tempo);
  }, [navigate]);

  return (
    <div style={estilos.tela}>
      <img 
        src={Logo} 
        alt="Hazuni Care" 
        style={estilos.logo}
      />
      
      <p style={estilos.carregando}>Carregando...</p>
    </div>
  );
}

const estilos = {
  tela: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
    margin: 0,
    padding: 0
  },
  logo: {
    width: '260px',
    height: 'auto',
    marginBottom: '30px'
  },
  frase: {
    fontSize: '20px',
    color: '#64748B',
    marginTop: '10px'
  },
  carregando: {
    marginTop: '40px',
    color: '#94A3B8'
  }
};