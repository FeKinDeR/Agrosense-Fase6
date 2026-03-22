//Controla se o card está aberto ou fechado.
function Card({ imagem, titulo, resumo, detalhes }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="card-item">
      <img src={imagem} alt={titulo} />
      <p>{resumo}</p>
      
      <button className="btn" onClick={() => setAberto(!aberto)}>
        {aberto ? 'Ver menos' : 'Saiba mais'}
      </button>

      {/* No React, fazemos a renderização condicional: 
          Se 'aberto' for true, ele mostra a div abaixo */}
      {aberto && (
        <div className="expansao-card" style={{ display: 'block' }}>
          <p>{detalhes}</p>
        </div>
      )}
    </div>
  );
}