import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/Public/Splash';
import Cadastro from './pages/Public/Cadastro';
import Login from './pages/Public/Login';
import Home from './pages/Private/Home';
import HazuniIA from './pages/Private/HazuniIA';
import Perfil from './pages/Private/Perfil';
import Documentos from './pages/Private/Documentos';
import Notificacoes from './pages/Private/Notificacoes';
import AlterarSenha from './pages/Private/AlterarSenha';
import Agenda from './pages/Private/Agenda';
import Medicamentos from './pages/Private/Medicamentos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hazuni-ia" element={<HazuniIA />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
      </Routes>
    </BrowserRouter>
  );
}