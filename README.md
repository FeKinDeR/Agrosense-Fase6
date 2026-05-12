# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Fase 7 - AgroSense

O projeto agora possui uma entrega funcional com React no front-end e Python com banco SQLite no back-end, alinhando os capitulos de consumo de API, Python com banco de dados e integrais.

Para rodar a API Python:

```bash
python backend/agrosense_api.py
```

Para rodar o site:

```bash
npm run dev
```

Depois, acesse `http://localhost:5173`, entre com usuario `admin` e senha `1234` e abra o dashboard. Quando a API estiver ligada, o painel mostra `Python + SQLite conectado` e grava as leituras no arquivo `backend/agrosense.db`.

No dashboard, a area analisada e calculada pelo metodo dos trapezios, integrando a velocidade do drone ao longo do tempo e multiplicando pela faixa de aplicacao.

## Documentacao UML

- `DIAGRAMA_UML.md`: explicacao dos diagramas e relacao com os capitulos.
- `docs/uml/agrosense-component-uml.mmd`: diagrama de classes/componentes.
- `docs/uml/agrosense-sequence-fase7.mmd`: diagrama de sequencia do fluxo React -> Python -> SQLite.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
