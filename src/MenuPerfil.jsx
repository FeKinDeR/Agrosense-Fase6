import React, { useState } from 'react';

// 1. O 'setTelaAtiva' já está aqui nas props
export function MenuPerfil({ isLogged, onLogout, setTelaAtiva }) {
  const [dropdownAberta, setDropdownAberta] = useState(false);
  
  // 2. REMOVIDA a linha do useNavigate (ela causava a tela branca)

  const usuario = {
    nome: "Agricultor Generico",
    email: "agro@generico.com"
  };

  const handleOpcaoClick = (tela) => {
    // 3. TROCAMOS navigate(rota) por setTelaAtiva(tela)
    if (setTelaAtiva) {
      setTelaAtiva(tela); 
    }
    setDropdownAberta(false);
  };

  if (!isLogged) return null;

  return (
    <div className="user-profile-container">
      <button 
        className="profile-trigger" 
        onClick={() => setDropdownAberta(!dropdownAberta)}
      >
        <span className="profile-initial">{usuario.nome.charAt(0)}</span>
      </button>

      {dropdownAberta && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <span className="dropdown-initial">{usuario.nome.charAt(0)}</span>
            <span className="dropdown-name">{usuario.nome}</span>
            <span className="dropdown-email">{usuario.email}</span>
          </div>
          
          <div className="profile-dropdown-menu">
            {/* 4. Ajustamos os nomes das telas para os estados que você usa no App.jsx */}
            <button onClick={() => handleOpcaoClick('assinaturas')}>💲 Assinaturas</button>
            <button onClick={() => handleOpcaoClick('home')}>🔁 Mudar de conta</button>
            
            <div className="dropdown-divider"></div>
            
            <button 
              onClick={() => { onLogout(); setDropdownAberta(false); }} 
              className="dropdown-logout"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}