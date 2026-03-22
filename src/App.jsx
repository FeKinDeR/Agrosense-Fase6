import { useState, useEffect } from 'react';
import './App.css';
import './assets/css/styles.css';
import imgEquipe from './assets/imgs/imagem_card_equipe.jpg';
import imgProjeto from './assets/imgs/img-projeto-2.jpg';
import AdminPanel from './AdminPanel';
import Contato from './entre-em-contato';

// 1. COMPONENTE CARD
function Card({ imagem, alt, resumo, detalhes }) {
  const [aberto, setAberto] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrar(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`card-item ${mostrar ? 'card-fade-in' : ''}`}>
       <img src={imagem} alt={alt} />
       <p>{resumo}</p>
       <button className="btn" onClick={() => setAberto(!aberto)}>
         {aberto ? 'Ver menos' : 'Saiba mais'}
       </button>
       
       {aberto && (
         <div className="expansao-card">
           <p>{detalhes}</p>
         </div>
       )}
    </div>
  );
}

// 2. COMPONENTE PRINCIPAL APP 
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
      <button 
        id="toggle-dark-mode" 
        onClick={toggleDarkMode}
        className="btn-tema-flutuante"
      >
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      <button 
        onClick={entrarNoAdmin}
        className="btn-admin-secreto"
      >
        ⚙️
      </button>

      {/* Início da Lógica de Telas */}
      {telaAtiva === 'admin' ? (
        <AdminPanel voltar={() => setTelaAtiva('home')} />
      ) : (
        <>
          {telaAtiva === 'home' ? (
            <>
              <div className="hero">
                <h1 className="hero-title">Tecnologias que facilitam</h1>
                <p className="hero-text">Trazendo melhorias para o seu negócio.</p>
                <button className="btn" onClick={() => setTelaAtiva('contato')}>Fale com a gente</button>
              </div>

              <div className="cards">
                <Card 
                  imagem={imgEquipe} 
                  alt="Equipe"
                  resumo="Conheça a equipe responsável pelo projeto."
                  detalhes="A equipe é formada por Álvaro Miguel, Giovani Barbosa, e Thais Verdi Bona."
                />
                <Card 
                  imagem={imgProjeto} 
                  alt="Projeto"
                  resumo="Conheça o nosso projeto."
                  detalhes="Protótipo funcional utilizando React para o agronegócio."
                />
              
                <div className="card-item card-fade-in">
                  <div className="video-responsive">
                    <iframe 
                      src="https://www.youtube.com/embed/62hPyAqRkz8?si=2rEjE-oGFC-VIJcv" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="video-caption">Assista a nossa apresentação do projeto.</p>
                </div>

              </div>
            </>
          ) : (
            <Contato voltar={() => setTelaAtiva('home')} />
          )}

          <footer className="site-footer">
            <p className="footer-copyright">© 2026 AgroSense - Tecnologia Agrícola</p>
            <button onClick={entrarNoAdmin} className="btn-admin-link">
              Área Administrativa (Restrito)
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;