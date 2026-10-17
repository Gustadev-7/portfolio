import { ContactInput } from '../src/app/shared/contact';

/**
 * Modelo do e-mail recebido pelo formulário de contato.
 * E-mail não é navegador: layout em tabelas e estilos inline, que é o que
 * Gmail, Outlook e afins renderizam de forma consistente.
 */

export interface ContactMeta {
  receivedAt: Date;
  /** Ex.: "Boituva, SP, BR" (vem dos cabeçalhos de geolocalização da Vercel). */
  origin?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const COLORS = {
  page: '#f3f1eb',
  card: '#ffffff',
  ink: '#191814',
  muted: '#67655d',
  faint: '#a3a097',
  line: '#e7e4dc',
  dark: '#0d0d0c',
  darkText: '#ecebe6',
  darkMuted: '#94928a',
  accent: '#b45309',
  accentBright: '#ffb547',
  ok: '#86d6a1',
};

const MONO = "'Geist Mono', ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', monospace";
const SANS = "'Geist', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function renderContactEmail(data: ContactInput, meta: ContactMeta): RenderedEmail {
  const receivedAt = meta.receivedAt.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const subject = data.assunto
    ? `${data.assunto} · mensagem de ${data.nome}`
    : `Nova mensagem de ${data.nome} pelo portfólio`;
  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: ${data.assunto || 'seu contato pelo portfólio'}`)}`;

  const rows: [string, string][] = [
    ['nome', escapeHtml(data.nome)],
    ['email', `<a href="mailto:${escapeHtml(data.email)}" style="color:${COLORS.accent};text-decoration:none;">${escapeHtml(data.email)}</a>`],
    ['assunto', data.assunto ? escapeHtml(data.assunto) : `<span style="color:${COLORS.faint};">—</span>`],
    ['recebido', `${escapeHtml(receivedAt)} <span style="color:${COLORS.faint};">(Brasília)</span>`],
    ...(meta.origin ? ([['origem', escapeHtml(meta.origin)]] as [string, string][]) : []),
  ];

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.page};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview(data.mensagem))}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${COLORS.card};border:1px solid ${COLORS.line};border-radius:12px;overflow:hidden;">

      <!-- barra superior: marca + "requisição" -->
      <tr><td style="background:${COLORS.dark};padding:16px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:${SANS};font-size:20px;font-weight:700;letter-spacing:-0.5px;color:${COLORS.darkText};">gusta<span style="color:${COLORS.accentBright};">.</span><span style="font-family:${MONO};font-weight:400;color:${COLORS.darkMuted};">dev</span></td>
          <td align="right" style="font-family:${MONO};font-size:12px;color:${COLORS.darkMuted};">POST /api/contact <span style="color:${COLORS.ok};font-weight:600;">202</span></td>
        </tr></table>
      </td></tr>

      <!-- título -->
      <tr><td style="padding:28px 24px 8px;">
        <p style="margin:0 0 6px;font-family:${MONO};font-size:12px;color:${COLORS.faint};">nova mensagem pelo portfólio</p>
        <h1 style="margin:0;font-family:${SANS};font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.5px;color:${COLORS.ink};">${escapeHtml(data.nome)} quer falar com você</h1>
      </td></tr>

      <!-- dados do remetente -->
      <tr><td style="padding:16px 24px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};">
          ${rows
            .map(
              ([key, value]) => `<tr>
            <td width="92" valign="top" style="padding:10px 0;border-bottom:1px solid ${COLORS.line};font-family:${MONO};font-size:12px;color:${COLORS.faint};">${key}</td>
            <td valign="top" style="padding:10px 0;border-bottom:1px solid ${COLORS.line};font-family:${SANS};font-size:14px;color:${COLORS.ink};">${value}</td>
          </tr>`,
            )
            .join('')}
        </table>
      </td></tr>

      <!-- mensagem -->
      <tr><td style="padding:20px 24px 4px;">
        <p style="margin:0 0 10px;font-family:${MONO};font-size:12px;color:${COLORS.faint};">mensagem</p>
        <div style="padding:16px 18px;background:${COLORS.page};border-left:3px solid ${COLORS.accent};border-radius:4px;font-family:${SANS};font-size:15px;line-height:1.6;color:${COLORS.ink};white-space:pre-wrap;">${escapeHtml(data.mensagem)}</div>
      </td></tr>

      <!-- ação -->
      <tr><td style="padding:24px 24px 28px;">
        <a href="${replyHref}" style="display:inline-block;padding:12px 20px;background:${COLORS.ink};color:#ffffff;border-radius:8px;font-family:${SANS};font-size:14px;font-weight:600;text-decoration:none;">Responder ${escapeHtml(firstName(data.nome))} →</a>
        <p style="margin:12px 0 0;font-family:${SANS};font-size:12px;color:${COLORS.faint};">Ou use “Responder” no seu e-mail: a resposta vai direto para ${escapeHtml(data.email)}.</p>
      </td></tr>

      <!-- rodapé -->
      <tr><td style="padding:14px 24px;border-top:1px solid ${COLORS.line};font-family:${MONO};font-size:11px;color:${COLORS.faint};">
        enviado pelo formulário de <a href="https://gustavo-domingos.vercel.app/#contato" style="color:${COLORS.muted};">gusta.dev</a> · nada é armazenado
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `Nova mensagem pelo portfólio (gusta.dev)`,
    ``,
    `nome:     ${data.nome}`,
    `email:    ${data.email}`,
    `assunto:  ${data.assunto || '—'}`,
    `recebido: ${receivedAt} (Brasília)`,
    ...(meta.origin ? [`origem:   ${meta.origin}`] : []),
    ``,
    data.mensagem,
    ``,
    `—`,
    `Responda este e-mail para falar com ${data.nome}.`,
  ].join('\n');

  return { subject, html, text };
}

/** Monta "Cidade, UF, País" a partir dos cabeçalhos de geolocalização da Vercel. */
export function originFromHeaders(headers: Headers): string | undefined {
  const city = headers.get('x-vercel-ip-city');
  const parts = [
    city ? safeDecode(city) : null,
    headers.get('x-vercel-ip-country-region'),
    headers.get('x-vercel-ip-country'),
  ].filter((part): part is string => !!part);
  return parts.length ? parts.join(', ') : undefined;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function firstName(nome: string): string {
  return nome.split(/\s+/)[0] ?? nome;
}

function preview(mensagem: string): string {
  const flat = mensagem.replace(/\s+/g, ' ');
  return flat.length > 110 ? `${flat.slice(0, 110)}…` : flat;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
