# Diagramas UML - AgroSense Fase 7

Este documento descreve os principais diagramas do projeto AgroSense na Fase 7. A entrega considera o front-end em React, a API em Python, o banco SQLite e os calculos matematicos com integrais.

## 1. Diagrama de classes e componentes

Arquivo Mermaid: `docs/uml/agrosense-component-uml.mmd`

O diagrama de classes representa os componentes principais da aplicacao e suas responsabilidades:

- `App`: controla a tela ativa, login, logout e modo escuro.
- `Header` e `MenuPerfil`: permitem navegacao, troca de tema e saida do usuario.
- `Login`: valida o acesso local com usuario e senha.
- `Dashboard`: tela principal da Fase 7, responsavel por buscar leituras, registrar novos dados e mostrar indicadores.
- `CalculosFase7`: agrupa as funcoes de calculo, incluindo o metodo dos trapezios.
- `AgroSenseAPI`: backend em Python que expoe os endpoints da telemetria.
- `SQLite`: banco de dados usado para persistir as leituras do drone.
- `Contato` e `AdminPanel`: fluxo de mensagens do usuario, com armazenamento local.
- `Sobre`, `Equipe`, `CardsPagina`, `Card` e `TecnologiasAgronegocios`: paginas e componentes institucionais.

```mermaid
classDiagram
direction LR

class Main {
  <<entrypoint>>
  +createRoot()
  +render(App)
}

class App {
  <<controller>>
  +telaAtiva
  +isLogged
  +darkMode
  +handleLoginSucesso()
  +handleLogout()
  +toggleDarkMode()
  +entrarNoAdmin()
}

class Dashboard {
  <<page>>
  +dados
  +apiOnline
  +form
  +carregarDados()
  +adicionarLeitura()
  +restaurarDados()
}

class CalculosFase7 {
  <<service>>
  +integrarTrapezios()
  +media()
  +classificarNdvi()
}

class AgroSenseAPI {
  <<python backend>>
  +GET telemetria()
  +POST telemetria()
  +DELETE telemetria()
  +inicializar_banco()
}

class SQLite {
  <<database>>
  +leituras
  +INSERT leitura
  +SELECT leituras
  +DELETE leituras
}

class LocalStorage {
  <<browser storage>>
  +darkMode
  +isLogged
  +mensagens
  +leiturasFallback
}

Main --> App : renderiza
App --> Dashboard : roteia
Dashboard --> CalculosFase7 : calcula integrais
Dashboard --> AgroSenseAPI : consome fetch
AgroSenseAPI --> SQLite : persiste leituras
Dashboard --> LocalStorage : fallback offline
App --> LocalStorage : tema e login
```

## 2. Diagrama de sequencia

Arquivo Mermaid: `docs/uml/agrosense-sequence-fase7.mmd`

O diagrama de sequencia mostra o fluxo principal do dashboard:

1. O usuario faz login.
2. O React renderiza o dashboard.
3. O dashboard chama a API Python.
4. A API consulta o SQLite.
5. O dashboard calcula os indicadores com integrais.
6. O usuario registra uma nova leitura.
7. A API valida e grava a leitura no banco.
8. O dashboard atualiza cards, mapa NDVI e tabela.

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant React as Frontend React
    participant Dashboard as Dashboard.jsx
    participant API as API Python
    participant DB as SQLite
    participant Calculos as Calculos Fase 7

    Usuario->>React: Acessa o site e faz login
    React->>Dashboard: Renderiza dashboard autenticado
    Dashboard->>API: GET /api/agrosense/telemetria
    API->>DB: SELECT leituras ORDER BY minuto
    DB-->>API: Retorna leituras do drone
    API-->>Dashboard: JSON com metadados e leituras
    Dashboard->>Calculos: integrarTrapezios(leituras)
    Calculos-->>Dashboard: Area, energia, NDVI medio e status
    Dashboard-->>Usuario: Exibe indicadores e mapa NDVI

    Usuario->>Dashboard: Registra nova leitura
    Dashboard->>API: POST /api/agrosense/telemetria
    API->>API: Valida velocidade, NDVI, umidade e bateria
    API->>DB: INSERT INTO leituras
    DB-->>API: Gravacao confirmada
    API-->>Dashboard: JSON atualizado
    Dashboard->>Calculos: Recalcula integral e indicadores
    Dashboard-->>Usuario: Atualiza tabela, cards e mapa
```

## 3. Relacao com os capitulos

- Capitulo 2: eletricidade basica aplicada no calculo `P = V x I` e energia em `Wh`.
- Capitulo 3: diagrama de classes atualizado.
- Capitulo 4: diagrama de sequencia do fluxo de telemetria.
- Capitulo 5: front-end React, CSS e consumo de API com `fetch`.
- Capitulo 6: API Python conectada ao banco SQLite.
- Capitulo 7: calculo de area pelo metodo dos trapezios, aplicando integrais.

## 4. Fluxo de dados

```text
Usuario
  -> React / Dashboard
  -> API Python
  -> SQLite
  -> API Python
  -> Dashboard
  -> Calculos de integrais
  -> Indicadores exibidos na tela
```

## 5. Observacao sobre fallback

Se a API Python nao estiver em execucao, o dashboard usa o arquivo local `public/api/agrosense-fase7.json` e o `localStorage` como modo de demonstracao. Quando a API esta ligada, a persistencia principal acontece no banco `backend/agrosense.db`.
