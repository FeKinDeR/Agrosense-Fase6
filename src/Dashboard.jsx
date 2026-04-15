import React, { useState, useEffect } from 'react';

export function Dashboard() {
  // Simulação de dados que mudariam em tempo real
  const [telemetria, setTelemetria] = useState({
    bateria: 85,
    altitude: 12,
    velocidade: 5.2,
    areaCoberta: 1240
  });

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h1>Painel de Controle AgroSense</h1>
        <p>Monitoramento em tempo real do Drone Alpha-01</p>
      </header>

      <div className="dash-grid">
        {/* Cards de Telemetria */}
        <div className="dash-card">
          <h3>🔋 Bateria</h3>
          <p className="dash-valor">{telemetria.bateria}%</p>
          <div className="progresso-bg">
            <div className="progresso-bar" style={{ width: `${telemetria.bateria}%` }}></div>
          </div>
        </div>

        <div className="dash-card">
          <h3>📏 Altitude</h3>
          <p className="dash-valor">{telemetria.altitude}m</p>
        </div>

        <div className="dash-card">
          <h3>🚀 Velocidade</h3>
          <p className="dash-valor">{telemetria.velocidade} m/s</p>
        </div>

        <div className="dash-card">
          <h3>🌾 Área Analisada</h3>
          <p className="dash-valor">{telemetria.areaCoberta} m²</p>
        </div>
      </div>

      <div className="dash-main-content">
        <div className="mapa-simulado">
          <h3> Placeholder (NDVI)</h3>
          <div className="mapa-placeholder">
            {/* Aqui no futuro entraria a API do Google Maps ou Mapbox */}
            <p>Carregando mapa de biomassa...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard
