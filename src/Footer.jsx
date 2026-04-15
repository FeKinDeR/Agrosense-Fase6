import React from 'react';
import logo from './assets/imgs/logo_sem_fundo.png';

// 1. O Footer deve receber 'setTelaAtiva' como prop
function Footer({ setTelaAtiva }) {
  const links = [
    { id: 'home', label: 'Inicio' },
    { id: 'login', label: 'Login'},
    { id: 'sobre', label: 'Sobre' },
    { id: 'equipe', label: 'Equipe' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-brand">
          {/* 2. Troque o Link por um button ou div com onClick */}
          <button className="footer-brand-button" onClick={() => setTelaAtiva('home')}>
            <img src={logo} alt="AgroSense" className="footer-logo" />
            <span className="footer-brand-name">AgroSense</span>
          </button>
          <p className="footer-description">
            Solucoes para conectar tecnologia, produtividade e inovacao no agronegocio.
          </p>
        </div>

        <div className="footer-links">
          <h3>Navegação</h3>
          <nav className="footer-nav" aria-label="Navegacao do rodape">
            {links.map((link) => (
              /* 3. Volte para a tag button */
              <button
                key={link.id}
                className="footer-link"
                onClick={() => setTelaAtiva(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-highlight">
          <h3>Agro com mais inteligência</h3>
          <p>
            Conteúdo institucional, equipe e contato reunidos em uma experiência clara em
            qualquer tamanho de tela.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 AgroSense - Tecnologia Agrícola</p>
      </div>
    </footer>
  );
}

export default Footer;