import { useState } from 'react';

function Card({ imagem, titulo, resumo, detalhes }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="card-item">
      <img src={imagem} alt={titulo} />
      <p>{resumo}</p>

      <button className="btn" onClick={() => setAberto(!aberto)}>
        {aberto ? 'Ver menos' : 'Saiba mais'}
      </button>

      {aberto && (
        <div className="expansao-card" style={{ display: 'block' }}>
          <p>{detalhes}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
