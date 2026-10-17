import { ContactReply, validateContact } from '../src/app/shared/contact';

/**
 * POST /api/contact — função serverless da Vercel.
 * Valida a mensagem e a encaminha por e-mail usando a API REST do Resend.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY    chave da API do Resend
 *   CONTACT_TO_EMAIL  endereço que recebe as mensagens
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const RESEND_URL = 'https://api.resend.com/emails';
const SENDER = 'Portfólio gusta.dev <onboarding@resend.dev>';

// Limite por IP em memória: vale por instância da função, então é uma
// proteção "melhor esforço" contra abuso, não uma garantia.
const recentRequests = new Map<string, number[]>();

export async function POST(request: Request): Promise<Response> {
  const env = readEnv();
  if (!env.apiKey || !env.to) {
    console.error('[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados');
    return reply(500, 'Internal Server Error', 'o serviço de e-mail não está configurado');
  }

  if (isRateLimited(clientIp(request))) {
    return reply(429, 'Too Many Requests', 'muitas mensagens em pouco tempo; tente de novo em alguns minutos');
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply(400, 'Bad Request', 'o corpo da requisição não é um JSON válido');
  }

  // honeypot: campo invisível que só robôs preenchem. Finge sucesso e descarta.
  if (isBot(body)) {
    return reply(202, 'Accepted', 'mensagem recebida');
  }

  const result = validateContact(body);
  if (!result.ok) {
    return reply(422, 'Unprocessable Entity', result.message, result.field);
  }

  const { nome, email, assunto, mensagem } = result.data;
  const resend = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: SENDER,
      to: [env.to],
      reply_to: email,
      subject: assunto ? `[portfólio] ${assunto}` : `[portfólio] Contato de ${nome}`,
      text: `${mensagem}\n\n—\n${nome} <${email}>\nEnviado pelo formulário de gusta.dev`,
    }),
  }).catch((error: unknown) => {
    console.error('[contact] falha de rede ao chamar o Resend', error);
    return null;
  });

  if (!resend?.ok) {
    if (resend) console.error('[contact] Resend respondeu', resend.status, await resend.text());
    return reply(502, 'Bad Gateway', 'o serviço de e-mail não respondeu; tente de novo ou use o e-mail direto');
  }

  return reply(202, 'Accepted', 'mensagem recebida; respondo em breve no seu e-mail');
}

function reply(status: number, label: string, message: string, field?: ContactReply['field']): Response {
  const body: ContactReply = { status, label, message, ...(field ? { field } : {}) };
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

function readEnv(): { apiKey?: string; to?: string } {
  const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
  return { apiKey: env['RESEND_API_KEY'], to: env['CONTACT_TO_EMAIL'] };
}

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'desconhecido';
}

function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  recentRequests.set(ip, recent);
  return recent.length > RATE_MAX_REQUESTS;
}

function isBot(body: unknown): boolean {
  if (body === null || typeof body !== 'object') return false;
  const website = (body as Record<string, unknown>)['website'];
  return typeof website === 'string' && website.trim() !== '';
}
