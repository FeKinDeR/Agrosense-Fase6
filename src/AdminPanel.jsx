import { useState, useEffect } from 'react';

function AdminPanel({ voltar }) {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('mensagens') || '[]');
    setMensagens(dados);
  }, []);

  const excluirMsg = (id) => {
    const filtradas = mensagens.filter(m => m.id !== id);
    setMensagens(filtradas);
    localStorage.setItem('mensagens', JSON.stringify(filtradas));
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={voltar} className="btn btn-voltar-admin">
          ← Voltar ao Site
        </button>
      </header>

      {mensagens.length === 0 ? (
        <p className="empty-msg">Nenhuma mensagem encontrada.</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="col-data">Data</th>
                <th className="col-nome">Nome</th>
                <th className="col-email">Email</th>
                <th className="col-msg">Mensagem</th>
                <th className="col-acao">Ação</th>
              </tr>
            </thead>
            <tbody>
              {mensagens.map(msg => (
                <tr key={msg.id}>
                  <td>{msg.data}</td>
                  <td>{msg.nome}</td>
                  <td>{msg.email}</td>
                  <td className="td-mensagem">{msg.mensagem}</td>
                  <td>
                    <button 
                      onClick={() => excluirMsg(msg.id)} 
                      className="btn-excluir"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;