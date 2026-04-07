import React from 'react';
import felipePaiva from './assets/imgs/felipe_paiva.jpg';

function Equipe({ voltar }) {
  const membros = [
    {
      id: 1,
      nome: 'Felipe Paiva',
      cargo: '💻 Desenvolvedor Full Stack em Transição',
      foto: felipePaiva,
      descricao: 'Profissional com sólida experiência em vendas e em transição para a área de tecnologia. Possui conhecimentos em JavaScript, React, Node.js, HTML e CSS, com foco no desenvolvimento de aplicações modernas, responsivas e intuitivas. Apaixonado por resolver problemas, aprender continuamente e transformar ideias em soluções reais através do código.'
    }
  ];

  return (
    <div className="pagina-equipe">
      <div className="equipe-header">
        <h1>Nossa Equipe</h1>
        <p className="equipe-intro">Conheça os profissionais por trás da AgroSense</p>
      </div>

      <div className="equipe-container">
        <div className="equipe-cards">
          {membros.map((membro) => (
            <div key={membro.id} className="membro-card">
              <div className="membro-foto">
                <img src={membro.foto} alt={membro.nome} />
              </div>
              <div className="membro-info">
                <h4 className="membro-nome">{membro.nome}</h4>
                <h3 className="membro-cargo">{membro.cargo}</h3>
                <p className="membro-descricao">{membro.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Equipe;
