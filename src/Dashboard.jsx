import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:8000/api/agrosense/telemetria';
const STORAGE_KEY = 'agrosense_leituras_fase7';

const dadosPadrao = {
  drone: 'Drone Alpha-01',
  talhao: 'Talhao Experimental 03',
  cultura: 'Soja',
  tensaoBateria: 14.8,
  correnteMedia: 7.4,
  faixaAplicacao: 7,
  vazaoPadrao: 1.4,
  leituras: [
    { minuto: 0, velocidade: 0, ndvi: 0.73, umidade: 42, bateria: 96 },
    { minuto: 2, velocidade: 4.6, ndvi: 0.71, umidade: 41, bateria: 93 },
    { minuto: 4, velocidade: 5.1, ndvi: 0.68, umidade: 39, bateria: 89 },
    { minuto: 6, velocidade: 4.8, ndvi: 0.62, umidade: 37, bateria: 84 },
    { minuto: 8, velocidade: 5.5, ndvi: 0.58, umidade: 35, bateria: 78 },
    { minuto: 10, velocidade: 5.0, ndvi: 0.64, umidade: 38, bateria: 72 },
  ],
};

function integrarTrapezios(pontos, valor) {
  if (pontos.length < 2) return 0;

  return pontos.slice(1).reduce((total, ponto, index) => {
    const anterior = pontos[index];
    const intervaloSegundos = (ponto.minuto - anterior.minuto) * 60;
    const media = (valor(anterior) + valor(ponto)) / 2;
    return total + media * intervaloSegundos;
  }, 0);
}

function media(pontos, campo) {
  if (!pontos.length) return 0;
  const soma = pontos.reduce((total, ponto) => total + Number(ponto[campo] || 0), 0);
  return soma / pontos.length;
}

function formatarNumero(valor, casas = 1) {
  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

function classificarNdvi(ndvi) {
  if (ndvi >= 0.7) return { texto: 'Vigor alto', classe: 'bom' };
  if (ndvi >= 0.55) return { texto: 'Atencao moderada', classe: 'alerta' };
  return { texto: 'Area critica', classe: 'critico' };
}

export function Dashboard() {
  const [dados, setDados] = useState(dadosPadrao);
  const [carregando, setCarregando] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [form, setForm] = useState({
    velocidade: '4.9',
    ndvi: '0.66',
    umidade: '38',
    bateria: '70',
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error('API Python indisponivel');
        const json = await resposta.json();
        setDados(json);
        setApiOnline(true);
      } catch {
        setApiOnline(false);
        try {
          const resposta = await fetch('/api/agrosense-fase7.json');
          const json = await resposta.json();
          const leiturasSalvas = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
          setDados({ ...json, leituras: leiturasSalvas || json.leituras });
        } catch {
          const leiturasSalvas = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
          setDados({ ...dadosPadrao, leituras: leiturasSalvas || dadosPadrao.leituras });
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const indicadores = useMemo(() => {
    const leituras = [...dados.leituras].sort((a, b) => a.minuto - b.minuto);
    const distanciaMetros = integrarTrapezios(leituras, (ponto) => ponto.velocidade);
    const areaM2 = distanciaMetros * dados.faixaAplicacao;
    const tempoMinutos = leituras.at(-1)?.minuto || 0;
    const volumeLitros = tempoMinutos * dados.vazaoPadrao;
    const potenciaW = dados.tensaoBateria * dados.correnteMedia;
    const energiaWh = potenciaW * (tempoMinutos / 60);
    const ndviMedio = media(leituras, 'ndvi');
    const umidadeMedia = media(leituras, 'umidade');
    const bateriaAtual = leituras.at(-1)?.bateria || 0;

    return {
      leituras,
      distanciaMetros,
      areaM2,
      volumeLitros,
      potenciaW,
      energiaWh,
      ndviMedio,
      umidadeMedia,
      bateriaAtual,
      status: classificarNdvi(ndviMedio),
    };
  }, [dados]);

  const adicionarLeitura = async (event) => {
    event.preventDefault();
    const ultimoMinuto = indicadores.leituras.at(-1)?.minuto || 0;
    const novaLeitura = {
      minuto: ultimoMinuto + 2,
      velocidade: Number(form.velocidade),
      ndvi: Number(form.ndvi),
      umidade: Number(form.umidade),
      bateria: Number(form.bateria),
    };

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaLeitura),
      });

      if (!resposta.ok) throw new Error('Falha ao gravar no banco');
      const json = await resposta.json();
      setDados(json);
      setApiOnline(true);
    } catch {
      const novasLeituras = [...indicadores.leituras, novaLeitura];
      setDados((atual) => ({ ...atual, leituras: novasLeituras }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novasLeituras));
      setApiOnline(false);
    }

    setForm((atual) => ({
      ...atual,
      bateria: String(Math.max(0, Number(atual.bateria) - 4)),
    }));
  };

  const restaurarDados = async () => {
    try {
      const resposta = await fetch(API_URL, { method: 'DELETE' });
      if (!resposta.ok) throw new Error('Falha ao restaurar banco');
      const json = await resposta.json();
      localStorage.removeItem(STORAGE_KEY);
      setDados(json);
      setApiOnline(true);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setDados(dadosPadrao);
      setApiOnline(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <div>
          <span className="dash-kicker">Fase 7 - Monitoramento funcional</span>
          <h1>Painel de Controle AgroSense</h1>
          <p>
            {dados.drone} acompanhando {dados.cultura} no {dados.talhao}.
          </p>
          <span className={`data-source-tag ${apiOnline ? 'online' : 'offline'}`}>
            {apiOnline ? 'Python + SQLite conectado' : 'Modo demonstracao local'}
          </span>
        </div>
        <span className={`status-pill ${indicadores.status.classe}`}>
          {indicadores.status.texto}
        </span>
      </header>

      <section className="dash-grid" aria-label="Indicadores do voo">
        <article className="dash-card">
          <h3>Bateria</h3>
          <p className="dash-valor">{formatarNumero(indicadores.bateriaAtual, 0)}%</p>
          <div className="progresso-bg">
            <div className="progresso-bar" style={{ width: `${indicadores.bateriaAtual}%` }} />
          </div>
        </article>

        <article className="dash-card">
          <h3>Area integrada</h3>
          <p className="dash-valor">{formatarNumero(indicadores.areaM2, 0)} m2</p>
          <small>Integral da velocidade x faixa de aplicacao</small>
        </article>

        <article className="dash-card">
          <h3>Insumo estimado</h3>
          <p className="dash-valor">{formatarNumero(indicadores.volumeLitros)} L</p>
          <small>Vazao media de {formatarNumero(dados.vazaoPadrao)} L/min</small>
        </article>

        <article className="dash-card">
          <h3>Energia consumida</h3>
          <p className="dash-valor">{formatarNumero(indicadores.energiaWh)} Wh</p>
          <small>P = V x I = {formatarNumero(indicadores.potenciaW)} W</small>
        </article>
      </section>

      <section className="dash-main-content">
        <div className="mapa-simulado">
          <div className="section-title-row">
            <div>
              <h2>Mapa NDVI simulado</h2>
              <p>Quanto mais intensa a cor, maior a prioridade de analise do talhao.</p>
            </div>
            {carregando && <span className="loading-tag">Carregando banco...</span>}
          </div>

          <div className="ndvi-map">
            {indicadores.leituras.map((leitura) => (
              <button
                key={leitura.minuto}
                className={`ndvi-cell ${classificarNdvi(leitura.ndvi).classe}`}
                title={`Min ${leitura.minuto}: NDVI ${leitura.ndvi}`}
                type="button"
              >
                <span>{leitura.minuto} min</span>
                <strong>{leitura.ndvi.toFixed(2)}</strong>
              </button>
            ))}
          </div>
        </div>

        <aside className="dash-side-panel">
          <h2>Nova leitura do drone</h2>
          <form className="telemetry-form" onSubmit={adicionarLeitura}>
            <label>
              Velocidade (m/s)
              <input
                type="number"
                step="0.1"
                min="0"
                value={form.velocidade}
                onChange={(event) => setForm({ ...form, velocidade: event.target.value })}
                required
              />
            </label>
            <label>
              NDVI
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={form.ndvi}
                onChange={(event) => setForm({ ...form, ndvi: event.target.value })}
                required
              />
            </label>
            <label>
              Umidade (%)
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={form.umidade}
                onChange={(event) => setForm({ ...form, umidade: event.target.value })}
                required
              />
            </label>
            <label>
              Bateria (%)
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                value={form.bateria}
                onChange={(event) => setForm({ ...form, bateria: event.target.value })}
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn-primary-action">Registrar</button>
              <button type="button" className="btn-secondary-action" onClick={restaurarDados}>
                Restaurar
              </button>
            </div>
          </form>
        </aside>
      </section>

      <section className="dash-table-section">
        <div className="section-title-row">
          <div>
            <h2>Historico usado nos calculos</h2>
            <p>Com a API Python ligada, os dados sao gravados no SQLite.</p>
          </div>
        </div>
        <div className="table-responsive">
          <table className="telemetry-table">
            <thead>
              <tr>
                <th>Minuto</th>
                <th>Velocidade</th>
                <th>NDVI</th>
                <th>Umidade</th>
                <th>Bateria</th>
              </tr>
            </thead>
            <tbody>
              {indicadores.leituras.map((leitura) => (
                <tr key={`${leitura.minuto}-${leitura.ndvi}`}>
                  <td>{leitura.minuto}</td>
                  <td>{formatarNumero(leitura.velocidade)} m/s</td>
                  <td>{leitura.ndvi.toFixed(2)}</td>
                  <td>{formatarNumero(leitura.umidade, 0)}%</td>
                  <td>{formatarNumero(leitura.bateria, 0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
