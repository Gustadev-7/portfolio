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

## API de contato

O formulário envia para `POST /api/contact`, uma função serverless da Vercel em [`api/contact.ts`](api/contact.ts) que valida a mensagem e a encaminha por e-mail via [Resend](https://resend.com). As regras de validação ficam em [`src/app/shared/contact.ts`](src/app/shared/contact.ts) e são usadas pelo front e pelo back.

| Status | Quando |
|---|---|
| `202 Accepted` | mensagem enviada |
| `400 Bad Request` | corpo não é JSON |
| `422 Unprocessable Entity` | campo inválido (retorna `field`) |
| `429 Too Many Requests` | mais de 5 envios em 10 min pelo mesmo IP |
| `502 Bad Gateway` | o Resend não respondeu |

Variáveis de ambiente (Vercel → Settings → Environment Variables):

- `RESEND_API_KEY`: chave da API do Resend
- `CONTACT_TO_EMAIL`: e-mail que recebe as mensagens

Em `ng serve` a rota `/api` não existe; o formulário mostra o erro e oferece o envio pelo cliente de e-mail. Para testar a função localmente, use `npx vercel dev`.

## Currículo e imagem de prévia

- `public/curriculo.pdf`: o currículo baixado pelo site. Para atualizar, basta substituir este arquivo mantendo o nome.
- Alternativa: [`design/curriculo.html`](design/curriculo.html) (PDF já gerado em `design/curriculo-gerado.pdf`), uma versão no visual do site. Para gerar de novo: abra no Chrome → Ctrl+P → "Salvar como PDF" (margens: nenhuma; gráficos de plano de fundo: marcado).
- `public/og.png` (1200×630): imagem exibida ao compartilhar o link, gerada a partir de [`design/og-image.html`](design/og-image.html).
- As meta tags `og:*` ficam em `src/index.html`. **Depois do deploy, troque o domínio de exemplo pelo endereço real.**

## Deploy (Vercel)

Framework preset: **Angular** · Output directory: `dist/portfolio/browser`.
