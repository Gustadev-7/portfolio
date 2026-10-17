/**
 * Regras do formulário de contato, compartilhadas entre o front (Angular)
 * e a função serverless (api/contact.ts). O backend sempre revalida:
 * a validação no navegador serve só para dar resposta rápida ao visitante.
 */

export interface ContactInput {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/** Corpo de toda resposta da API de contato. */
export interface ContactReply {
  status: number;
  label: string;
  message: string;
  field?: keyof ContactInput;
}

export const CONTACT_LIMITS = {
  nome: 80,
  email: 254,
  assunto: 120,
  mensagemMin: 10,
  mensagem: 5000,
} as const;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; field: keyof ContactInput; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(raw: unknown): ContactValidation {
  const body = (raw !== null && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const text = (key: keyof ContactInput): string => {
    const value = body[key];
    return typeof value === 'string' ? value.trim() : '';
  };

  // nome e assunto viram o assunto do e-mail: quebras de linha não são permitidas
  const data: ContactInput = {
    nome: singleLine(text('nome')),
    email: text('email'),
    assunto: singleLine(text('assunto')),
    mensagem: text('mensagem'),
  };

  if (!data.nome) return fail('nome', 'o campo "nome" é obrigatório');
  if (data.nome.length > CONTACT_LIMITS.nome) {
    return fail('nome', `"nome" aceita até ${CONTACT_LIMITS.nome} caracteres`);
  }

  if (!data.email) return fail('email', 'o campo "email" é obrigatório');
  if (data.email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(data.email)) {
    return fail('email', '"email" não parece um endereço válido');
  }

  if (data.assunto.length > CONTACT_LIMITS.assunto) {
    return fail('assunto', `"assunto" aceita até ${CONTACT_LIMITS.assunto} caracteres`);
  }

  if (!data.mensagem) return fail('mensagem', 'o campo "mensagem" é obrigatório');
  if (data.mensagem.length < CONTACT_LIMITS.mensagemMin) {
    return fail('mensagem', `"mensagem" precisa de pelo menos ${CONTACT_LIMITS.mensagemMin} caracteres`);
  }
  if (data.mensagem.length > CONTACT_LIMITS.mensagem) {
    return fail('mensagem', `"mensagem" aceita até ${CONTACT_LIMITS.mensagem} caracteres`);
  }

  return { ok: true, data };
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

function fail(field: keyof ContactInput, message: string): ContactValidation {
  return { ok: false, field, message };
}
