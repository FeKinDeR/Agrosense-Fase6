import React from 'react';

function TecnologiasAgronegocios() {
  const tecnologias = [
    {
      id: 1,
      titulo: "🤖 Inteligência Artificial",
      descricao: "Análise preditiva de safras, detecção de doenças em plantas e otimização de colheitas através de machine learning."
    },
    {
      id: 2,
      titulo: "🚁 Drones e Sensores",
      descricao: "Mapeamento aéreo de lavouras, monitoramento de solo e cobertura vegetal com precisão centimétrica em tempo real."
    },
    {
      id: 3,
      titulo: "💧 Irrigação Inteligente",
      descricao: "Sistemas automatizados que ajustam a quantidade de água conforme necessidade da cultura, economizando recursos."
    },
    {
      id: 4,
      titulo: "📊 Big Data & Analytics",
      descricao: "Coleta e análise de dados agrícolas para tomar decisões mais informadas e aumentar produtividade."
    },
    {
      id: 5,
      titulo: "🌱 IoT Rural",
      descricao: "Sensores conectados que monitoram temperatura, umidade, pH do solo e outras variáveis cruciais da plantação."
    },
    {
      id: 6,
      titulo: "🔄 Sustentabilidade",
      descricao: "Tecnologias que reduzem desperdício de água, fertilizantes e agroquímicos, preservando o meio ambiente."
    }
  ];

  return (
    <section className="tecnologias-section">
      <div className="tecnologias-container">
        <div className="tecnologias-header">
          <h2 className="tecnologias-title">🌾 Tecnologias para o Agronegócio</h2>
          <p className="tecnologias-subtitle">
            Transformando a agricultura com inovação e sustentabilidade
          </p>
        </div>

        <div className="tecnologias-grid">
          {tecnologias.map((tech) => (
            <div key={tech.id} className="tech-card">
              <h3 className="tech-titulo">{tech.titulo}</h3>
              <p className="tech-descricao">{tech.descricao}</p>
            </div>
          ))}
        </div>

        <div className="tecnologias-cta">
          <p className="cta-text">
            Somos especialistas em implementar essas tecnologias no seu negócio agrícola.
          </p>
          <p className="cta-emphasis">
            ✨ Produtividade • Sustentabilidade • Lucratividade
          </p>
        </div>
      </div>
    </section>
  );
}

export default TecnologiasAgronegocios;
