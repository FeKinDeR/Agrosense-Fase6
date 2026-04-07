import { useState, useEffect } from 'react';
import './App.css';
import './assets/css/styles.css';
import Header from './Header';
import AdminPanel from './AdminPanel';
import Contato from './entre-em-contato';
import Sobre from './Sobre';
import Equipe from './Equipe';
import TecnologiasAgronegocios from './TecnologiasAgronegocios';

// COMPONENTE PRINCIPAL APP 
function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const salvo = localStorage.getItem('darkMode');
    return salvo === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const entrarNoAdmin = () => {
    const senha = prompt("Digite a senha de administrador:");
    if (senha === "1234") {
      setTelaAtiva('admin');
    } else {
      alert("Acesso Negado!");
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      {/* Mostra Header em todas as páginas exceto Admin */}
      {telaAtiva !== 'admin' && (
        <Header 
          telaAtiva={telaAtiva}
          setTelaAtiva={setTelaAtiva}
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          onAdmin={entrarNoAdmin}
        />
      )}

      {/* Lógica de Telas */}
      {telaAtiva === 'admin' ? (
        <AdminPanel voltar={() => setTelaAtiva('home')} />
      ) : (
        <>
          {telaAtiva === 'home' && (
            <>
              <div className="hero">
                <h1 className="hero-title">Tecnologias que facilitam</h1>
                <p className="hero-text">Trazendo melhorias para o seu negócio.</p>
                <button className="btn" onClick={() => setTelaAtiva('contato')}>Fale com a gente</button>
              </div>
              <TecnologiasAgronegocios />
            </>
          )}

          {telaAtiva === 'sobre' && <Sobre voltar={() => setTelaAtiva('home')} />}

          {telaAtiva === 'equipe' && <Equipe voltar={() => setTelaAtiva('home')} />}

          {telaAtiva === 'contato' && <Contato voltar={() => setTelaAtiva('home')} />}

          <footer className="site-footer">
            <p className="footer-copyright">© 2026 AgroSense - Tecnologia Agrícola</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;