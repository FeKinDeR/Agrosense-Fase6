import React from 'react';
import imgEquipe from './assets/imgs/imagem_card_equipe.jpg';
import imgProjeto from './assets/imgs/img-projeto-2.jpg';
import CardsPagina from './CardsPagina';

function Sobre({ voltar, irParaEquipe }) {
  const cardsData = [
    {
      imagem: imgEquipe,
      alt: 'Equipe',
      resumo: 'Conheca a equipe responsavel pelo projeto.',
      detalhes: 'A equipe e formada por Alvaro Miguel, Giovani Barbosa, e Thais Verdi Bona.',
      onSaibaMais: irParaEquipe,
    },
    {
      imagem: imgProjeto,
      alt: 'Projeto',
      resumo: 'Conheca o nosso projeto.',
      detalhes: 'Prototipo funcional utilizando React para o agronegocio.',
    },
    {
      imagem: imgEquipe,
      alt: 'Missao',
      resumo: 'Nossa missao.',
      detalhes: 'Trazer tecnologia inovadora para transformar o agronegocio brasileiro.',
    },
  ];

  return (
    <div className="pagina-sobre">
      <div className="sobre-header">
        <h1>Sobre Nos</h1>
        <p className="sobre-intro">Conheca mais sobre nosso projeto e equipe</p>
      </div>

      <CardsPagina cards={cardsData} cardsPerPage={3} mostrarInfoPaginacao={false} />

      <div className="video-section">
        <h2>Nossa Apresentacao</h2>
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
          <p className="video-caption">Assista a nossa apresentacao do projeto.</p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;