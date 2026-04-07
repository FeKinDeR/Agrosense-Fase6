import React from 'react';
import imgEquipe from './assets/imgs/imagem_card_equipe.jpg';
import imgProjeto from './assets/imgs/img-projeto-2.jpg';
import CardsPagina from './CardsPagina';

function Sobre({ voltar }) {
  const cardsData = [
    {
      imagem: imgEquipe,
      alt: "Equipe",
      resumo: "Conheça a equipe responsável pelo projeto.",
      detalhes: "A equipe é formada por Álvaro Miguel, Giovani Barbosa, e Thais Verdi Bona."
    },
    {
      imagem: imgProjeto,
      alt: "Projeto",
      resumo: "Conheça o nosso projeto.",
      detalhes: "Protótipo funcional utilizando React para o agronegócio."
    },
    {
      imagem: imgEquipe,
      alt: "Missão",
      resumo: "Nossa missão.",
      detalhes: "Trazer tecnologia inovadora para transformar o agronegócio brasileiro."
    },
    {
      imagem: imgProjeto,
      alt: "Visão",
      resumo: "Nossa visão.",
      detalhes: "Ser referência em soluções tecnológicas para o setor agrícola."
    }
  ];

  return (
    <div className="pagina-sobre">
      <div className="sobre-header">
        <h1>Sobre Nós</h1>
        <p className="sobre-intro">Conheça mais sobre nosso projeto e equipe</p>
      </div>

      <CardsPagina cards={cardsData} cardsPerPage={3} />

      <div className="video-section">
        <h2>Nossa Apresentação</h2>
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
    </div>
  );
}

export default Sobre;
