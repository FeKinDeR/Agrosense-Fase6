import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardsPagina({ cards, cardsPerPage = 3 }) {
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Calcula o total de páginas
  const totalPaginas = Math.ceil(cards.length / cardsPerPage);

  // Calcula os cards da página atual
  const indexFinal = paginaAtual * cardsPerPage;
  const indexInicial = indexFinal - cardsPerPage;
  const cardsAtual = cards.slice(indexInicial, indexFinal);

  // Volta pra primeira página quando mudar o número de cards
  useEffect(() => {
    setPaginaAtual(1);
  }, [cards.length]);

  const irParaPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaAtual(numero);
    }
  };

  return (
    <div className="pagina-cards">
      <div className="cards">
        {cardsAtual.map((card, index) => (
          <Card 
            key={index}
            imagem={card.imagem}
            alt={card.alt}
            resumo={card.resumo}
            detalhes={card.detalhes}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button 
            className="btn-pagina"
            onClick={() => irParaPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            ← Anterior
          </button>

          <div className="numeros-paginas">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                className={`pagina-numero ${paginaAtual === num ? 'ativo' : ''}`}
                onClick={() => irParaPagina(num)}
              >
                {num}
              </button>
            ))}
          </div>

          <button 
            className="btn-pagina"
            onClick={() => irParaPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima →
          </button>
        </div>
      )}

      <div className="info-paginacao">
        <p>Página {paginaAtual} de {totalPaginas}</p>
      </div>
    </div>
  );
}

export default CardsPagina;
