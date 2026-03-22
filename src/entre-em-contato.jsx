import React, { useState } from 'react'; 
import logo from './assets/imgs/logo_sem_fundo.png'; 

function Contato({ voltar }) {
  const initialState = { nome: '', sobrenome: '', email: '', mensagem: '' };
  const [formData, setFormData] = useState(initialState);
  const [erros, setErros] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let errosEncontrados = {};

    // Validações 
    if (formData.nome.trim().length < 3) errosEncontrados.nome = "Nome muito curto.";
    if (formData.sobrenome.trim().length < 3) errosEncontrados.sobrenome = "Sobrenome muito curto.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) errosEncontrados.email = "E-mail inválido.";
    if (formData.mensagem.length > 500) errosEncontrados.mensagem = "Máximo 500 caracteres.";

    if (Object.keys(errosEncontrados).length > 0) {
      setErros(errosEncontrados);
      return;
    }

    setErros({}); 
    const mensagensAtuais = JSON.parse(localStorage.getItem('mensagens') || '[]');
    const novaLista = [...mensagensAtuais, { ...formData, id: Date.now(), data: new Date().toLocaleDateString() }];
    
    localStorage.setItem('mensagens', JSON.stringify(novaLista));

    console.log("Dados salvos:", novaLista); 
    alert("Mensagem enviada com sucesso!");
    setFormData(initialState);
  };

  return (
    <div className="pagina-contato">
      <header className="logo">
        <img src={logo} alt="AgroSense" />
        <h1>Tecnologias que facilitam.</h1>
        <button onClick={voltar} className="btn-home-flutuante">
          Home
        </button>
      </header>

      <div className="contato">
        <h3 className="contato-title">Entre em contato conosco.</h3>
        <p className="contato-text">Preencha o formulário abaixo com a sua mensagem.</p>
        
        <form id="contatoForm" onSubmit={handleSubmit}>
          
          <div className="campo">
            <input 
              type="text" 
              placeholder="Informe seu nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className={erros.nome ? 'input-error' : ''} 
            />
            {erros.nome && <span className="error-message">{erros.nome}</span>}
          </div>

          <div className="campo">
            <input 
              type="text" 
              placeholder="Informe seu sobrenome"
              value={formData.sobrenome}
              onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
              className={erros.sobrenome ? 'input-error' : ''}
            />
            {erros.sobrenome && <span className="error-message">{erros.sobrenome}</span>}
          </div>

          <div className="campo">
            <input 
              type="text" 
              placeholder="Informe seu e-mail"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={erros.email ? 'input-error' : ''}
            />
            {erros.email && <span className="error-message">{erros.email}</span>}
          </div>

          <div className="campo">
            <textarea 
              placeholder="Digite a sua mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              className={erros.mensagem ? 'input-error' : ''}
            ></textarea>
            {erros.mensagem && <span className="error-message">{erros.mensagem}</span>}
          </div>

          <button type="submit" className="btn-form">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contato;