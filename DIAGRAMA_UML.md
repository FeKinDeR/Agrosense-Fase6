# Diagrama de Classes UML - AgroSense

## 1.2 Diagrama de Classes

Este documento descreve o diagrama de classes UML para o projeto AgroSense, um sistema web de tecnologias para agronegócio.

### 1.2.1 Principais Classes e Elementos

#### 1. **App (Classe Principal)**
```
┌─────────────────────────────────────┐
│           App                        │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - telaAtiva: string               │
│  - darkMode: boolean               │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - setTelaAtiva()                  │
│  - toggleDarkMode()                │
│  - entrarNoAdmin()                 │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 2. **Header (Navbar)**
```
┌─────────────────────────────────────┐
│         Header                       │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - telaAtiva: string               │
│  - darkMode: boolean               │
│  - logo: image                     │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - navegarPara(tela)               │
│  - toggleTema()                    │
│  - abrirAdmin()                    │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 3. **Card**
```
┌─────────────────────────────────────┐
│         Card                         │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - imagem: string                  │
│  - alt: string                     │
│  - resumo: string                  │
│  - detalhes: string                │
│  - aberto: boolean                 │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - toggleDetalhes()                │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 4. **CardsPagina**
```
┌─────────────────────────────────────┐
│       CardsPagina                    │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - cards: Card[]                   │
│  - cardsPerPage: number            │
│  - paginaAtual: number             │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - getPagination()                 │
│  - irParaPagina(num)               │
│  - getCardsAtuais()                │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 5. **TecnologiasAgronegocios**
```
┌───────────────────────────────────────┐
│    TecnologiasAgronegocios            │
├───────────────────────────────────────┤
│ Atributos:                            │
│  - tecnologias: Tecnologia[]         │
├───────────────────────────────────────┤
│ Métodos:                              │
│  - getTecnologias()                  │
│  - render()                          │
└───────────────────────────────────────┘
```

#### 6. **Sobre**
```
┌─────────────────────────────────────┐
│          Sobre                       │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - cards: Card[]                   │
│  - videoUrl: string                │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 7. **Equipe**
```
┌─────────────────────────────────────┐
│         Equipe                       │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - membros: Membro[]               │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - getMembros()                    │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 8. **Contato**
```
┌─────────────────────────────────────┐
│        Contato                       │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - formData: FormData              │
│  - erros: Erro[]                   │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - validar()                       │
│  - enviarMensagem()                │
│  - salvarNoLocalStorage()          │
│  - render()                        │
└─────────────────────────────────────┘
```

#### 9. **AdminPanel**
```
┌─────────────────────────────────────┐
│       AdminPanel                     │
├─────────────────────────────────────┤
│ Atributos:                          │
│  - mensagens: Mensagem[]           │
│  - senha: string                   │
├─────────────────────────────────────┤
│ Métodos:                            │
│  - carregarMensagens()             │
│  - excluirMsg(id)                  │
│  - validarSenha()                  │
│  - render()                        │
└─────────────────────────────────────┘
```

### 1.2.2 Relacionamentos entre Classes

```
                            ┌─────────┐
                            │   App   │
                            └────┬────┘
                        ┌────────┼────────┬──────────┬──────────┐
                        │        │        │          │          │
                    ┌───▼─┐ ┌──▼──┐ ┌──▼─┐ ┌──▼──┐ ┌──▼──┐ ┌──▼────┐
                    │Head │ │Home │ │Sobr│ │Equip│ │Conta│ │Admin │
                    │     │ │     │ │    │ │     │ │to   │ │Panel │
                    └─┬───┘ └──┬──┘ └──┬─┘ └──┬──┘ └──┬──┘ └──────┘
                      │        │       │      │       │
                ┌─────┴────┐   │   ┌───┴──┐   │       │
                │           │   │   │      │   │       │
            ┌───▼──┐  ┌──┬──┴──┐ │  │      │   │
            │CardP │  │  │Cards │ │  │      │   │
            │agina │  │  │      │ │  │      │   │
            └──────┘  └──┴──────┘ │  │      │   │
                         │        │  │      │   │
                     ┌───▼─┐  ┌───┴──┴──┐   │   │
                     │Card │  │Tecnolog.│   │   │
                     │     │  │Agroneg. │   │   │
                     └─────┘  └─────────┘   │   │
                                        ┌───┴──┬┴───┐
                                        │           │
                               ┌────────▼──┐  ┌────▼──────┐
                               │FormData / │  │ Mensagem/ │
                               │Validação  │  │ LocalStore│
                               └───────────┘  └───────────┘
```

### 1.2.3 Tipos de Relacionamentos

1. **Composição** (App ➜ Header, Sobre, Contato, Equipe)
   - App contém os componentes principais
   - Relacionamento forte (existência dependente)

2. **Agregação** (Sobre ➜ CardsPagina ➜ Card)
   - Cards são agregados em páginas
   - CardsPagina agrupa múltiplos Cards

3. **Associação** (Contato ➜ FormData)
   - Contato utiliza dados do formulário
   - AdminPanel utiliza Mensagens do LocalStorage

4. **Herança/Reutilização** (Header, Sobre ➜ Cards)
   - Cards são reutilizados em múltiplas páginas

### 1.2.4 Armazenamento de Dados

**LocalStorage:**
- `darkMode`: boolean - Preferência de tema do usuário
- `mensagens`: Mensagem[] - Mensagens de contato armazenadas

### 1.2.5 Fluxo de Navegação

```
Home (Hero + Tecnologias)
  ↓
Navbar
  ├─ Início → Home
  ├─ Sobre → CardsPagina com Cards
  ├─ Equipe → (em desenvolvimento)
  └─ Contato → FormulárioContato
     └─ Admin (com senha)
        └─ AdminPanel (gerencia mensagens)
```

---

**Data**: 7 de Abril de 2026  
**Projeto**: AgroSense - Tecnologia Agrícola  
**Versão**: 1.0
