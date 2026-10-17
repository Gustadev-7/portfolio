# gusta.dev

Portfólio de Gustavo Domingos, desenvolvido em **Angular 21 + TypeScript** (componentes standalone, signals, zoneless).

O conceito é tratar o site como uma API: cada seção é um endpoint (`GET /sobre`, `GET /projetos`, `POST /contato`), a navegação vira um access log e a barra inferior funciona como a status bar de uma IDE.

## Rodando

```bash
npm install
npm start          # http://localhost:4200
npm test           # testes com Vitest
npm run build      # gera dist/portfolio/browser
```

Atalhos no site: **T** alterna o tema · **L** abre o access log.

## Onde editar

Todo o conteúdo (textos, projetos, stack, trajetória, links) fica em
[`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts). Os componentes só fazem a apresentação.

```
src/app/
├── components/   # uma pasta por seção (hero, about, projects, stack, journey, contact…)
├── data/         # conteúdo do portfólio
├── directives/   # appEndpoint (seção ativa + log) e appReveal (animação ao rolar)
├── models/       # interfaces TypeScript
├── services/     # tema, access log, API do GitHub
└── utils/        # serializador de JSON com realce de sintaxe
```

## Currículo e imagem de prévia

- `public/curriculo.pdf`: o currículo baixado pelo site. Para atualizar, basta substituir este arquivo mantendo o nome.
- Alternativa: [`design/curriculo.html`](design/curriculo.html) (PDF já gerado em `design/curriculo-gerado.pdf`), uma versão no visual do site. Para gerar de novo: abra no Chrome → Ctrl+P → "Salvar como PDF" (margens: nenhuma; gráficos de plano de fundo: marcado).
- `public/og.png` (1200×630): imagem exibida ao compartilhar o link, gerada a partir de [`design/og-image.html`](design/og-image.html).
- As meta tags `og:*` ficam em `src/index.html`. **Depois do deploy, troque o domínio de exemplo pelo endereço real.**

## Deploy (Vercel)

Framework preset: **Angular** · Output directory: `dist/portfolio/browser`.
