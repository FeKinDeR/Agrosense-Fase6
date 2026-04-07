import React, { useState, useEffect } from 'react';

function Card({ imagem, alt, resumo, detalhes, onSaibaMais }) {
  const [aberto, setAberto] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrar(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSaibaMais = () => {
    if (onSaibaMais) {
      onSaibaMais();
      return;
    }

    setAberto(!aberto);
  };

  return (
    <div className={`card-item ${mostrar ? 'card-fade-in' : ''}`}>
      <img src={imagem} alt={alt} />
      <p>{resumo}</p>
      <button className="btn" onClick={handleSaibaMais}>
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

export default Card;
