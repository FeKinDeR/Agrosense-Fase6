import React, { useState } from 'react';

export function Login({ onLogin, voltar }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [erro, setErro] = useState(''); // Estado para a mensagem de erro

    const handleAcessar = (e) => {
        e.preventDefault();
        
        const usuarioValido = "admin";
        const senhaValida = "1234"; 

        if (user === usuarioValido && pass === senhaValida) {
            setErro(''); // Limpa o erro se der certo
            onLogin();
        } else {
            // Em vez de alert(), usamos o setErro
            setErro("Usuário ou senha incorretos!");
            setPass(''); // Limpa apenas a senha para nova tentativa
        }
    };
    
    return (
        <div className="pagina-login-container">
            <div className="login-box">
                <form onSubmit={handleAcessar}>
                    <h2 className="login-titulo-sistema">Login</h2>

                    {/* EXIBIÇÃO DA MENSAGEM DE ERRO (Igual ao contato) */}
                    {erro && <span className="error-message">{erro}</span>}

                    <div className="campo">
                        <input 
                            type="text" 
                            placeholder="Usuário" 
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="campo">
                        <input 
                            type="password" 
                            placeholder="Senha" 
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="login-buttons">
                        <button type="submit" className="btn-entrar">Entrar</button>
                        <button type="button" className="btn-cancelar" onClick={voltar}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;