import { useState, useEffect } from 'react';
import './App.css';
import './assets/css/styles.css';
import Header from './Header';
import Footer from './Footer';
import AdminPanel from './AdminPanel';
import Contato from './entre-em-contato';
import Sobre from './Sobre';
import Equipe from './Equipe';
import TecnologiasAgronegocios from './TecnologiasAgronegocios';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');
  
  const [isLogged, setIsLogged] = useState(() => {  
    const salvo = localStorage.getItem('isLogged');
    return salvo === 'true'; 
  });

  const [darkMode, setDarkMode] = useState(() => {
    const salvo = localStorage.getItem('darkMode');
    return salvo === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLoginSucesso = () => {
    setIsLogged(true);
    localStorage.setItem('isLogged', 'true');
    setTelaAtiva('dashboard');
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('isLogged');
    setTelaAtiva('home');
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const entrarNoAdmin = () => {
    const senha = prompt('Digite a senha de administrador:');
    if (senha === '1234') {
      setTelaAtiva('admin');
    } else {
      alert('Acesso Negado!');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      
      {telaAtiva === 'admin' ? (
        <AdminPanel voltar={() => setTelaAtiva('home')} />
      ) : (
        <>
          <Header
            telaAtiva={telaAtiva}
            setTelaAtiva={setTelaAtiva}
            onToggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            onAdmin={entrarNoAdmin}
            isLogged={isLogged}
            onLogout={handleLogout}
          />

          <main>
            {telaAtiva === 'home' && (
              <>
                <div className="hero">
                  <h1 className="hero-title">Tecnologias que facilitam</h1>
                  <p className="hero-text">Trazendo melhorias para o seu negocio.</p>
                  <button className="btn" onClick={() => setTelaAtiva('contato')}>
                    Fale com a gente
                  </button>
                </div>
                <TecnologiasAgronegocios />
              </>
            )}

            {telaAtiva === 'sobre' && (
              <Sobre
                voltar={() => setTelaAtiva('home')}
                irParaEquipe={() => setTelaAtiva('equipe')} 
              />
            )}

            {telaAtiva === 'login' && (
              <Login
                onLogin={handleLoginSucesso}
                voltar={() => setTelaAtiva('home')}
              />
            )}

            {telaAtiva === 'equipe' && <Equipe voltar={() => setTelaAtiva('home')} />}
        
            {telaAtiva === 'dashboard' && isLogged && <Dashboard />}
            
            {telaAtiva === 'contato' && <Contato voltar={() => setTelaAtiva('home')} />}
          </main>

          <Footer setTelaAtiva={setTelaAtiva} />
        </>
      )}
    </div>
  );
}

export default App;