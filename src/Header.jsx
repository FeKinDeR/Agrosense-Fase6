import React from 'react';
import logo from './assets/imgs/logo_sem_fundo.png';

function Header({ telaAtiva, setTelaAtiva, onToggleDarkMode, darkMode, onAdmin }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => setTelaAtiva('home')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="AgroSense" className="logo-img" />
          <span className="logo-text">AgroSense</span>
        </div>

        <nav className="navbar-menu">
          <button 
            className={`nav-link ${telaAtiva === 'home' ? 'ativo' : ''}`}
            onClick={() => setTelaAtiva('home')}
          >
            Início
          </button>
          <button 
            className={`nav-link ${telaAtiva === 'sobre' ? 'ativo' : ''}`}
            onClick={() => setTelaAtiva('sobre')}
          >
            Sobre
          </button>
          <button 
            className={`nav-link ${telaAtiva === 'equipe' ? 'ativo' : ''}`}
            onClick={() => setTelaAtiva('equipe')}
          >
            Equipe
          </button>
          <button 
            className={`nav-link ${telaAtiva === 'contato' ? 'ativo' : ''}`}
            onClick={() => setTelaAtiva('contato')}
          >
            Contato
          </button>
        </nav>

        <div className="navbar-controls">
          <button 
            className="btn-tema-flutuante"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button 
            className="btn-admin-secreto"
            onClick={onAdmin}
            title="Admin"
          >
            ⚙️
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
