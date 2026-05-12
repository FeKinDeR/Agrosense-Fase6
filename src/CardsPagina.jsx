import React, { useState } from 'react';
import Card from './Card';

function CardsPagina({ cards, cardsPerPage = 3, mostrarInfoPaginacao = true }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(cards.length / cardsPerPage);
  const paginaSegura = Math.min(paginaAtual, totalPaginas || 1);
  const indexFinal = paginaSegura * cardsPerPage;
  const indexInicial = indexFinal - cardsPerPage;
  const cardsAtual = cards.slice(indexInicial, indexFinal);

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
            onSaibaMais={card.onSaibaMais}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button
            className="btn-pagina"
            onClick={() => irParaPagina(paginaSegura - 1)}
            disabled={paginaSegura === 1}
          >
            Anterior
          </button>

          <div className="numeros-paginas">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`pagina-numero ${paginaSegura === num ? 'ativo' : ''}`}
                onClick={() => irParaPagina(num)}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            className="btn-pagina"
            onClick={() => irParaPagina(paginaSegura + 1)}
            disabled={paginaSegura === totalPaginas}
          >
            Proxima
          </button>
        </div>
      )}

      {mostrarInfoPaginacao && (
        <div className="info-paginacao">
          <p>Pagina {paginaSegura} de {totalPaginas}</p>
        </div>
      )}
    </div>
  );
}

export default CardsPagina;
