import React from 'react';
import felipePaiva from './assets/imgs/felipe_paiva.jpg';
import thais from './assets/imgs/Thais.jpg';
import giovani22 from './assets/imgs/giovani22.jpg';
import alvaro from './assets/imgs/Alvaro.jpg';

function Equipe() {
  const membros = [
    {
      nome: 'Felipe Paiva',
      img: felipePaiva,
      alt: 'Foto de Felipe',
      href: 'https://www.instagram.com/devfelipekinder/',
      texto:
        'Atua com visão empreendedora, desenvolvimento full stack e interesse forte em cibersegurança e inovação.',
    },
    {
      nome: 'Thais Verdi Bona',
      img: thais,
      alt: 'Foto de Thais Verdi Bona',
      imageClassName: 'member-image-thais',
      href: 'https://www.instagram.com/devfelipekinder/',
      texto:
        'Especialista em UX/UI e comunicação visual, focada em deixar a experiência do usuário clara e moderna.',
    },
    {
      nome: 'Giovani Barbosa',
      img: giovani22,
      alt: 'Foto de Giovani Barbosa',
      imageClassName: 'member-image-giovani',
      href: 'https://www.instagram.com/devfelipekinder/',
      texto:
        'Formado em ADS pelo SENAI, com base em programação. Atualmente estudando Java e Estrutura de Dados. Ainda no início da carreira, mas com aprendizado rápido e muita vontade de evoluir.',
    },
    {
      nome: 'Alvaro Morais',
      img: alvaro,
      alt: 'Foto de Alvaro Morais',
      href: 'https://www.instagram.com/devfelipekinder/',
      texto:
        'Responsável pela estratégia de conteúdo e integração entre equipe técnica e clientes do agro.',
    },
  ];

  const values = [
    'Inovação com propósito',
    'Clareza na comunicação',
    'Colaboração entre áreas',
    'Tecnologia com impacto social',
  ];

  return (
    <section className="page-shell pagina-equipe">
      <div className="site-container">
        <div className="page-heading premium-heading">
          <h1>Sobre o projeto e a equipe</h1>
          <p>
            Unimos tecnologia, pesquisa e visão de negócio para mostrar como o agro
            pode evoluir com inovação aplicada.
          </p>
        </div>

        <div className="about-hero-grid">
          <div className="card-panel about-feature">
            <h3>Nossa missão</h3>
            <p>
              Demonstrar como soluções tecnológicas podem elevar a produtividade rural,
              reduzir desperdícios e fortalecer a segurança alimentar no Brasil.
            </p>
          </div>

          <div className="card-panel about-feature">
            <h3>Nossa visão</h3>
            <p>
              Contribuir para um agronegócio mais moderno, eficiente e orientado por dados,
              aproximando inovação e impacto positivo na sociedade.
            </p>
          </div>
        </div>

        <div className="values-panel">
          {values.map((value) => (
            <article className="value-chip" key={value}>
              {value}
            </article>
          ))}
        </div>

        <div className="card-grid members-grid">
          {membros.map((membro) => {
            const content = (
              <article className="member-card premium-member-card">
                <img src={membro.img} alt={membro.alt} className={membro.imageClassName} />
                <div className="member-card-body">
                  <h3>{membro.nome}</h3>
                  <p>{membro.texto}</p>
                </div>
              </article>
            );

            return membro.href ? (
              <a
                key={membro.nome}
                href={membro.href}
                target="_blank"
                rel="noreferrer"
                className="member-link"
              >
                {content}
              </a>
            ) : (
              <div key={membro.nome}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Equipe;
